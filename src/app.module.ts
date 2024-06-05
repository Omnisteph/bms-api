import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { BorrowRecordModule } from './borrow-record/borrow-record.module';

@Module({
  imports: [UserModule, AuthModule, BookModule, BorrowRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
