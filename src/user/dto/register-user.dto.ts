import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterUserDto {
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

  @ApiProperty()
  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @ApiProperty({ enum: Role })
  //@IsEnum(Role)

  role: Role;
}
