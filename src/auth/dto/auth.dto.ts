import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}