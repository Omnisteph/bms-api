import { Controller, Body, Post, Res, Get, Param, Patch, Delete } from '@nestjs/common';
import { BorrowRecordService } from './borrow-record.service';
import { BorrowRecordDto, UpdateBorrowRecordDto } from './dto/borrowRecord.dto';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';

@Controller('borrow-record')
export class BorrowRecordController {
  constructor(private readonly borrowRecordService: BorrowRecordService) {}

  @Auth([Role.LIBRARIAN])
  @Post()
  async createBorrowedRecords(@Body() input: BorrowRecordDto, @Res() res: Response) {
    const records = await this.borrowRecordService.createBorrowedRecords(input);
    res.status(200).json({ message: `Borrowed Book Added Succesfully`, records});
  }

  @Auth([Role.LIBRARIAN])
  @Get()
  async getAllBorrowedrecords() {
    return this.borrowRecordService.getAllBorrowedRecords();
  }

  @Auth([Role.LIBRARIAN])
  @Get(':id')
  async getBorrowRecord(@Param('id') id: string) {
    return await this.borrowRecordService.getBorrowRecord(id);
  }

  @Auth([Role.LIBRARIAN])
  @Patch(':id')
  async updateBorrowedRecord(@Param('id') id: string, @Body() update: UpdateBorrowRecordDto, @Res() res: Response) {
    const record = this.borrowRecordService.updateBorrowedRecord(id, update);
    res.status(200).json({ message: `Borrowed Book Updated Succesfully`, record});
  }

  @Auth([Role.LIBRARIAN])
  @Delete(':id')
  async removeBorrowedBook(@Param('id') id: string, @Res() res: Response) {
    const record = this.borrowRecordService.removeBorrowedBook(id);
    res.status(200).json({ message: `Borrowed Book Deleted Succesfully`, record});

  }
}
