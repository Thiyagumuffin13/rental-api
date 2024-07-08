import { Module } from '@nestjs/common';
import { ReceiptStructureService } from './receipt-structure.service';
import { ReceiptStructureController } from './receipt-structure.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/auth/auth.strategy';
import { JwtConfigModule } from 'src/jwt-config/jwt-config.module';

@Module({
    imports:[DatabaseModule,JwtConfigModule],
  controllers: [ReceiptStructureController],
  providers: [ReceiptStructureService,JwtStrategy],
})
export class ReceiptStructureModule {}
