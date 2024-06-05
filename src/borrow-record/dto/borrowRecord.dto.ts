import { BorrowStatus } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";

export class BorrowRecordDto {
    @IsString()
    @IsNotEmpty()
    readonly bookId: string

    @IsString()
    @IsNotEmpty()
    readonly memberId: string

    @IsString()
    @IsNotEmpty()
    readonly borrowedDate: string

    @IsString()
    @IsNotEmpty()
    readonly dueDate: string
}


export class UpdateBorrowRecordDto {
    @IsString()
    @IsOptional()
    readonly bookId: string

    @IsString()
    @IsOptional()
    readonly memberId: string

    @IsString()
    @IsOptional()
    readonly borrowedDate: string

    @IsString()
    @IsOptional()
    readonly dueDate: string

    @IsString()
    @IsOptional()
    readonly returnDate: string

    @IsEnum(BorrowStatus, {each: true})
    @IsOptional()
    readonly status: BorrowStatus
}