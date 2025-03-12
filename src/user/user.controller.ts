import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, Role } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guard/role.guard';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { Roles } from 'src/decorator/roles.decorator';

//@SkipThrottle() // use here for skipping all routes
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Roles('SUPERADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    console.log("======vlaidatiiie====", createUserDto)
    return this.userService.create(createUserDto as Prisma.UserCreateInput);
  }

  @SkipThrottle({ default: false }) // if false, for specific route skipping the multiple api request will disable
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiBearerAuth('Authorization')
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiOperation({ summary: 'Find all users' })
  @ApiQuery({ name: 'role', required: false, enum: Role })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(@Query('role') role?: Role) {
    return this.userService.findAll(role);
  }


  /*if we use this static route after the below dynamic route it will still work as dynamic route. 
  works as waterfall model which order matters here*/

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @Get('userCount') // static route has only userDatas are route and no dynamic datas
  @ApiBearerAuth('Authorization') // added this for swagger authorization, in swagger add token alone no need bearer key
  @ApiOperation({ summary: 'Get user count' })
  @ApiResponse({ status: 200, description: 'Return user count.' })
  getUserDatas() {
    return this.userService.getUserDatas();
  }


  // @Get(':id') // dynamic route which is param passed
  // findOne(@Param('id') id: string) { // without parseint pipe we need to user +id and datatype as string
  //   return this.userService.findOne(+id);
  // }
  @Throttle({ user1: { ttl: 3000, limit: 1 } }) // make specific route as blcoking multiple api request with limit and time
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Find one user by ID' })
  @ApiParam({ name: 'id', type: 'integer', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        summary: 'Sample Update Request',
        value: {
          name: "John Doe",
          email: "johndoe@example.com",
          mobile: "9876543210",
          role: "ADMIN"
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto as Prisma.UserUpdateInput);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
