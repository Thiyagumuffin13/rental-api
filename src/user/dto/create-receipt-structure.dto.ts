import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, isDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReceiptStructureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rentPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  advancePrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ebPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  waterPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  rentalInitiationDate: Date;
}
