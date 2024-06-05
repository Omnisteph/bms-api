import { Status } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BookDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    readonly author: string

    @IsString()
    @IsNotEmpty()
    readonly genre: string

    @IsString()
    @IsNotEmpty()
    readonly isbn: string

    @IsString()
    @IsNotEmpty()
    readonly publishedDate: string
}


export class UpdateBookDto {
    @IsString()
    @IsOptional()
    readonly title: string

    @IsString()
    @IsOptional()
    readonly author: string

    @IsString()
    @IsOptional()
    readonly genre: string

    @IsString()
    @IsOptional()
    readonly isbn: string

    @IsString()
    @IsOptional()
    readonly publishedDate: string

    @IsEnum(Status, {each: true})
    @IsOptional()
    readonly status: Status
}