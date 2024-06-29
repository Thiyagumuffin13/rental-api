import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/auth/auth.strategy';
import { JwtConfigModule } from 'src/jwt-config/jwt-config.module';

@Module({
  imports:[DatabaseModule,JwtConfigModule],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
