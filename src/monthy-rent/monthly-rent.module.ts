import { Module } from '@nestjs/common';
import { MonthlyRentService } from './monthly-rent.service';
import { MonthlyRentController } from './monthly-rent.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports:[DatabaseModule],
  controllers: [MonthlyRentController],
  providers: [MonthlyRentService],
})
export class MonthlyRentModule {}
