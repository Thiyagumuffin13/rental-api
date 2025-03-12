import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) { }

  getUserDatas() {
    return this.dbService.user.count();
  }

  async findAll(role?: Role) {
    console.log("--role--", role);
    const selectFields = {
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    };
    if (role) return this.dbService.user.findMany({
      where: {
        role
      },
      ...selectFields
    });
    return this.dbService.user.findMany({
      ...selectFields
    });
  }

  async findOne(id: number) {
    const user = await this.dbService.user.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        email: true,
        mobile: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.dbService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        role: createUserDto.role ?? 'USER'
      }
    })
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    const existingUser = await this.dbService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!existingUser) {
      throw new NotFoundException('User Not Found');
    }
    return this.dbService.user.update({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.dbService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.dbService.user.delete({
      where: {
        id,
      }
    })
  }
}
