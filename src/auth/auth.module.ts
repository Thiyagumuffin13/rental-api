import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtStrategy } from './auth.strategy';


@Module({
    imports: [
      JwtModule.register({
        secret: 'your_secret_key', // Replace with your secret key
        signOptions: { expiresIn: '1h' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, DatabaseService],
  })
export class AuthModule {}
