import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { name, email, mobile, password, confirmPassword, role } = createUserDto;
    console.log("---create--",createUserDto);
    
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const existingEmail = await this.dbService.user.findUnique({
      where: { email: email },
    });
  
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }
  
    const existingMobile = await this.dbService.user.findUnique({
      where: { mobile: mobile },
    });
  
    if (existingMobile) {
      throw new BadRequestException('Mobile number already exists');
    }
  

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.dbService.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        role: role || 'USER', // default role
      },
      select: { name: true, email: true, mobile: true, role: true } 
    });
    
    return createdUser;
    //return this.generateToken(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.dbService.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  
}
