import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsNotEmpty, Matches, MinLength, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be exactly 10 digits long' })
    mobile: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    @Transform(({ value }) => value || Role.USER)
    role: Role;
}
