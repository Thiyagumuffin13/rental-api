import { IS_NUMBER, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsNumber()
    mobile: number;
    @IsEnum([ "SUPERADMIN" , "ADMIN" , "USER"],{
        message: "Please provide valid role"
    })
    role: "SUPERADMIN" | "ADMIN" | "USER";
}
