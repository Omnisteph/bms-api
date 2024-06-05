import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BorrowRecordDto, UpdateBorrowRecordDto } from './dto/borrowRecord.dto';

@Injectable()
export class BorrowRecordService {
    constructor (private readonly prisma: PrismaService) {}

    async createBorrowedRecords(input: BorrowRecordDto) {
        const {bookId, memberId} = input;

        //Check if Book Exist
        const findBook = await this.prisma.book.findUnique({where: {id: bookId}});
        if(!findBook || findBook.status !== 'AVAILABLE') {
            throw new NotFoundException('This Book Does Exist');
        }
        //Check if Member Exist
         await this.prisma.member.findUnique({where: {id: memberId}});

         //Create Record and Update Book Status
         await this.prisma.book.update({
            where: {id: bookId},
            data: {status: 'BORROWED'}
         })

         return this.prisma.borrowRecord.create({
            data: input
         })
      
    }

    async getAllBorrowedRecords() {
        const records =  this.prisma.borrowRecord.findMany({include: {book: true, member: true}});
        return records;
    }

    async getBorrowRecord (id: string) {
        const record = await this.prisma.borrowRecord.findUnique({
            where: {id},
            include: {book: true, member: true}
        });
        if(!record){ 
            throw new NotFoundException(`Borrow Record with ID ${id} not found`);
        };
        return record;
    }

    async updateBorrowedRecord (id: string, update: UpdateBorrowRecordDto) {
        //Check if BorrowedBook Exist
        const findBook = await this.prisma.borrowRecord.findUnique({where: {id}});
        if(!findBook) {
            throw new NotFoundException('Book Record Not Found');
        }
        //Update Book Status If Returning A Book
        if(update.status === 'RETURNED') {
            await this.prisma.book.update({
                where: {id: findBook.bookId},
                data: {status: 'AVAILABLE'},
            });
        }
        return this.prisma.borrowRecord.update({
            where: {id},
            data: update
        });
    }

    async removeBorrowedBook(id: string) {
         //Check if BorrowedBook Exist
         const findBook = await this.prisma.borrowRecord.findUnique({where: {id}});
         if(!findBook) {
             throw new NotFoundException('Book Record Not Found');
         }

         //If Returning a Book Update Book Status
         if(findBook.status === 'BORROWED') {
            await this.prisma.book.update({
                where: {id: findBook.bookId},
                data: {status: 'AVAILABLE'},
            });
         }
         return this.prisma.borrowRecord.delete({
            where: {id}
         });
    }
}
