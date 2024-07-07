import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MonthlyRentService } from './monthly-rent.service';
import { CreateMonthlyRentDto } from 'src/user/dto/create-monthly-rent.dto';

@Controller('monthlyRent')
export class MonthlyRentController {
  constructor(private readonly monthlyRentService: MonthlyRentService) {}

  @Post()
  @ApiOperation({ summary: 'Calculate and Save Monthly Rent' })
  @ApiResponse({ status: 201, description: 'Monthly Rent successfully saved.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) createMonthlyRentDto: CreateMonthlyRentDto) {
    return this.monthlyRentService.calculateAndSaveMonthlyRent(createMonthlyRentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Receipt Structure' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  getAll() {
    return this.monthlyRentService.getAll();
  }

}
