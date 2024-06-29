import { Module } from '@nestjs/common';
import { ReceiptStructureService } from './receipt-structure.service';
import { ReceiptStructureController } from './receipt-structure.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports:[DatabaseModule],
  controllers: [ReceiptStructureController],
  providers: [ReceiptStructureService],
})
export class ReceiptStructureModule {}
