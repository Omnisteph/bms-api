import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookDto, UpdateBookDto } from './dto/book.dto';
import { Status } from '@prisma/client';

@Injectable()
export class BookService {
    constructor (private readonly prisma: PrismaService) {}

    async addBook(input: BookDto) {
        const {title, author, genre, publishedDate, isbn } = input;
        const checkBook = await this.prisma.book.findUnique({where: {isbn}});
            if(checkBook) {
                throw new BadRequestException(`This Book With Isbn: ${input.isbn} Already Exist`);
            } else {
                try {
                    const book = await this.prisma.book.create({
                        data: {
                            title,
                            author,
                            isbn,
                            publishedDate,
                            genre
                        }
                    });
                    return book;
                } catch (error) {
                    console.error(error);
                    throw new Error(`Failed To Add Book: ${error.message}`);
                }
            }   

    }

    async getAllBooks() {
        try {
            const books = await this.prisma.book.findMany();
            return books;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Fetch All Books: ${error.message}`);
        }
    }

    async getBook(id: string) {
        try {
            const book = await this.prisma.book.findUnique({
                where: {id}
            });
            return book;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Fetch Book: ${error.message}`);
        }
    }

    async updateBook(id: string, update: UpdateBookDto) {
        const checkBook = await this.prisma.book.findUnique({where: {id}});
        if(!checkBook) {
            throw new NotFoundException('Book Not Found');
        }
        try {
            const book = await this.prisma.book.update({
                where: {id},
                data: update
            });
            return book
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Update Book: ${error.message}`);
        }

    }


    async deleteBook(id: string) {
        const checkBook = await this.prisma.book.findUnique({where: {id}});
        if(!checkBook) {
            throw new NotFoundException('Book Not Found');
        }
        try {
            const book = await this.prisma.book.delete({
                where: {id}
            });
            return book;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Delete Book: ${error.message}`);
        }
    }
    

    async genreBooks(genre: string) {
        try {
            const books = await this.prisma.book.findMany({
                where: {genre: genre}
            });
            return books;
        } catch (error) {
            console.error(error);
            throw new Error(`Failed To Find Genre Books: ${error.message}`);
        }
    }
}
