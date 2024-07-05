import { CreateReceiptStructureDto } from './create-receipt-structure.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReceiptStructureDto extends PartialType(CreateReceiptStructureDto) {}

