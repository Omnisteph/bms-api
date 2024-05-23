import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string

    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsString()
    @IsNotEmpty()
    readonly address: string

    @IsEnum(Role, {each: true})
    readonly role: Role
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly email: string

    @IsString()
    @IsOptional()
    readonly phoneNumber: string

    @IsString()
    @IsOptional()
    readonly address: string

    @IsOptional()
    @IsEnum(Role, {each: true})
    readonly role: Role
}