import { Transform } from 'class-transformer';
import { IsDate, isDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReceiptStructureDto {
  @IsNotEmpty()
  @IsNumber()
  rentPrice: number;

  @IsNotEmpty()
  @IsNumber()
  advancePrice: number;

  @IsNotEmpty()
  @IsNumber()
  ebPrice: number;

  @IsNotEmpty()
  @IsNumber()
  waterPrice: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  rentalInitiationDate: Date;
}
