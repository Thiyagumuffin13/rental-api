import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, Role } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

//@SkipThrottle() // use here for skipping all routes
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto as Prisma.UserCreateInput);
  }

  @SkipThrottle({default: false}) // if false, for specific route skipping the multiple api request will disable
  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiQuery({ name: 'role', required: false, enum: Role })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(@Query('role') role?: Role) {
    return this.userService.findAll(role);
  }


  /*if we use this static route after the below dynamic route it will still work as dynamic route. 
  works as waterfall model which order matters here*/

  @Get('userCount') // static route has only userDatas are route and no dynamic datas
  @ApiOperation({ summary: 'Get user count' })
  @ApiResponse({ status: 200, description: 'Return user count.' })
  getUserDatas() {
    return this.userService.getUserDatas();
  }
  

  // @Get(':id') // dynamic route which is param passed
  // findOne(@Param('id') id: string) { // without parseint pipe we need to user +id and datatype as string
  //   return this.userService.findOne(+id);
  // }
  @Throttle({user1:{ttl:3000, limit:1}}) // make specific route as blcoking multiple api request with limit and time
  @Get(':id')
  @ApiOperation({ summary: 'Find one user by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseIntPipe)id: number){
    return this.userService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto as  Prisma.UserUpdateInput);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
