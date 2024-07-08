import { Module } from '@nestjs/common';
import { MonthlyRentService } from './monthly-rent.service';
import { MonthlyRentController } from './monthly-rent.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtConfigModule } from 'src/jwt-config/jwt-config.module';
import { JwtStrategy } from 'src/auth/auth.strategy';

@Module({
    imports:[DatabaseModule,JwtConfigModule],
  controllers: [MonthlyRentController],
  providers: [MonthlyRentService,JwtStrategy],
})
export class MonthlyRentModule {}
