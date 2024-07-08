import { Controller, Post, Body, Get, Param, ValidationPipe, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReceiptStructureService } from './receipt-structure.service';
import { CreateReceiptStructureDto } from 'src/user/dto/create-receipt-structure.dto';
import { UpdateReceiptStructureDto } from 'src/user/dto/update-receipt-structure.dto';
import { RolesGuard } from 'src/guard/role.guard';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('receiptStructure')
export class ReceiptStructureController {
  constructor(private readonly receiptStructureService: ReceiptStructureService) {}

  @Post()
  @Roles('SUPERADMIN','ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create Receipt Structure' })
  @ApiResponse({ status: 201, description: 'Receipt Structure successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) createReceiptStructureDto: CreateReceiptStructureDto) {
    return this.receiptStructureService.create(createReceiptStructureDto);
  }

  @Get(':userId')
  @Roles('SUPERADMIN','ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get Receipt Structure by User ID' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  findByUserId(@Param('userId') userId: string) {
    return this.receiptStructureService.findByUserId(parseInt(userId));
  }

  @Get()
  @Roles('SUPERADMIN','ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get All Receipt Structure' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  getAll() {
    return this.receiptStructureService.getAll();
  }

  @Put(':id')
  @Roles('SUPERADMIN','ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update Receipt Structure by ID' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully updated.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateReceiptStructureDto: UpdateReceiptStructureDto) {
    return this.receiptStructureService.update(parseInt(id), updateReceiptStructureDto);
  }

  @Delete(':id')
  @Roles('SUPERADMIN','ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete Receipt Structure by ID' })
  @ApiResponse({ status: 200, description: 'Receipt Structure successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Receipt Structure not found.' })
  delete(@Param('id') id: string) {
    return this.receiptStructureService.delete(parseInt(id));
  }
}
