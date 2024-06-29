import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateReceiptStructureDto } from 'src/user/dto/create-receipt-structure.dto';

@Injectable()
export class ReceiptStructureService {
  constructor(private dbService: DatabaseService) {}

  async create(createReceiptStructureDto: CreateReceiptStructureDto) {
    try{
        const userExists = await this.dbService.user.findUnique({
            where: { id: createReceiptStructureDto.userId },
          });
          if (!userExists) {
            throw new NotFoundException(`User with ID ${createReceiptStructureDto.userId} not found`);
          }
          const existingReceiptStructure = await this.findByUserId(createReceiptStructureDto.userId);
    
          if (existingReceiptStructure) {
            throw new ConflictException(`ReceiptStructure for User ID ${createReceiptStructureDto.userId} already exists.`);
          }
        return this.dbService.receiptStructure.create({
          data: createReceiptStructureDto,
        });
    }
    catch(error){
        console.error('Error creating ReceiptStructure:', error);
        throw error;
    }
    
  }

  async findByUserId(userId: number) {
    return this.dbService.receiptStructure.findUnique({
      where: { userId },
    });
  }

  async getAll(){
    return this.dbService.receiptStructure.findMany({
        
      });
  }
}
