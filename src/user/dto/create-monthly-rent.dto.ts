import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateMonthlyRentDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  pastEbUnit: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  currentEbUnit: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  familyMembers: number;
}
