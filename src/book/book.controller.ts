import { Controller, Post, Body, Res, Get, Param, Patch, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, UpdateBookDto } from './dto/book.dto';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Auth([Role.LIBRARIAN])
  @Post()
  async addBook(@Body() input: BookDto, @Res() res: Response) {
    const book = await this.bookService.addBook(input);
    return res.status(200).json({ message: `Book Added Successfully`, book});
  }

  @Get()
  async getAllBooks() {
    const books = await this.bookService.getAllBooks();
    return books;
  }

  @Get(':id')
  async getBook(@Param('id') id: string) {
    return await this.bookService.getBook(id);
  }

  @Auth([Role.LIBRARIAN])
  @Patch(':id')
  async updateBook(@Param('id') id: string, @Body() update: UpdateBookDto, @Res() res: Response) {
    const book = await this.bookService.updateBook(id, update);
    return res.status(200).json({ message: `Book Updated Successfully`, book});
  }

  @Auth([Role.LIBRARIAN])
  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Res() res: Response) {
    const book = await this.bookService.deleteBook(id);
    return res.status(200).json({ message: `Book Deleted Successfully`});
  }

  @Get('genre')
  async genreBooks(@Res() res: Response, @Body() genre: string) {
    const book = await this.bookService.genreBooks(genre);
    return book;
  }
  
}
