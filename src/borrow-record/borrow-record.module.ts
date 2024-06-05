import { Module } from '@nestjs/common';
import { BorrowRecordService } from './borrow-record.service';
import { BorrowRecordController } from './borrow-record.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BorrowRecordController],
  providers: [BorrowRecordService, PrismaService],
})
export class BorrowRecordModule {}
