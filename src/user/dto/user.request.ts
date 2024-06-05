import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";

export class MemberDto {
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
    readonly membershipStart: string

    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsString()
    @IsNotEmpty()
    readonly address: string
}

export class UpdateMemberDto {
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
    readonly membershipStart: string

    @IsString()
    @IsOptional()
    readonly address: string

    @IsOptional( )
    @IsEnum(Role, {each: true})
    readonly role: Role
}