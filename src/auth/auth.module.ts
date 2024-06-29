import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtStrategy } from './auth.strategy';
import { UserService } from 'src/user/user.service';
import { JwtConfigModule } from 'src/jwt-config/jwt-config.module';


@Module({
    imports: [
      JwtConfigModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, DatabaseService,UserService],
  })
export class AuthModule {}
