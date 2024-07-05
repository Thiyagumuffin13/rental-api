import { Controller, Post, Body, Get, Param, ValidationPipe, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReceiptStructureService } from './receipt-structure.service';
import { CreateReceiptStructureDto } from 'src/user/dto/create-receipt-structure.dto';
import { UpdateReceiptStructureDto } from 'src/user/dto/update-receipt-structure.dto';

@Controller('receiptStructure')
export class ReceiptStructureController {
  constructor(private readonly receiptStructureService: ReceiptStructureService) {}

  @Post()
  @ApiOperation({ summary: 'Create Receipt Structure' })
  @ApiResponse({ status: 201, description: 'Receipt Structure successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) createReceiptStructureDto: CreateReceiptStructureDto) {
    return this.receiptStructureService.create(createReceiptStructureDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get Receipt Structure by User ID' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  findByUserId(@Param('userId') userId: string) {
    return this.receiptStructureService.findByUserId(parseInt(userId));
  }

  @Get()
  @ApiOperation({ summary: 'Get All Receipt Structure' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  getAll() {
    return this.receiptStructureService.getAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Receipt Structure by ID' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully updated.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateReceiptStructureDto: UpdateReceiptStructureDto) {
    return this.receiptStructureService.update(parseInt(id), updateReceiptStructureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Receipt Structure by ID' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  delete(@Param('id') id: string) {
    return this.receiptStructureService.delete(parseInt(id));
  }
}
