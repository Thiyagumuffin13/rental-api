import { IsNotEmpty, IsNumber } from 'class-validator';

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
}
