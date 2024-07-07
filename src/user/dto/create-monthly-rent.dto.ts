import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateMonthlyRentDto {
  @IsInt()
  userId: number;

  @IsNumber()
  @IsPositive()
  pastEbUnit: number;

  @IsNumber()
  @IsPositive()
  currentEbUnit: number;

  @IsInt()
  @IsPositive()
  familyMembers: number;
}
