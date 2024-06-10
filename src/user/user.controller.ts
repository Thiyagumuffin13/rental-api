import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

//@SkipThrottle() // use here for skipping all routes
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @SkipThrottle({default: false}) // if false, for specific route skipping the multiple api request will disable
  @Get()
  findAll(@Query('role') role?: 'SUPERADMIN' | 'USER' | 'ADMIN') {
    return this.userService.findAll(role);
  }


  /*if we use this static route after the below dynamic route it will still work as dynamic route. 
  works as waterfall model which order matters here*/

  @Get('userDatas') // static route has only userDatas are route and no dynamic datas
  getUserDatas() {
    return this.userService.getUserDatas();
  }
  

  // @Get(':id') // dynamic route which is param passed
  // findOne(@Param('id') id: string) { // without parseint pipe we need to user +id and datatype as string
  //   return this.userService.findOne(+id);
  // }
  @Throttle({user1:{ttl:3000, limit:1}}) // make specific route as blcoking multiple api request with limit and time
  @Get(':id')
  findOne(@Param('id', ParseIntPipe)id: number){
    return this.userService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
