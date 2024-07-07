import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMonthlyRentDto } from 'src/user/dto/create-monthly-rent.dto';


@Injectable()
export class MonthlyRentService {
  constructor(private dbService: DatabaseService) {}

  async calculateAndSaveMonthlyRent(createMonthlyRentDto: CreateMonthlyRentDto) {

    const { userId, pastEbUnit, currentEbUnit, familyMembers } = createMonthlyRentDto;

    const receiptStructure = await this.dbService.receiptStructure.findUnique({
      where: { userId: userId },
    });

    if (!receiptStructure) {
      throw new NotFoundException('ReceiptStructure not found for the given userId');
    }

    const { rentPrice, ebPrice, waterPrice } = receiptStructure;

    const ebUnitCharges = (currentEbUnit - pastEbUnit) * ebPrice;

    const totalRentPrice = rentPrice + ebUnitCharges + (waterPrice * familyMembers);

    const monthlyRent = await this.dbService.monthlyRent.create({
      data: {
        pastEbUnit: pastEbUnit,
        currentEbUnit: currentEbUnit,
        ebUnitCharges: ebUnitCharges,
        familyMembers: familyMembers,
        totalRentPrice: totalRentPrice,
        receiptStructureId: receiptStructure.id,
        userId: userId,
      },
    });

    return monthlyRent;
  }

  async getAll(){
    return this.dbService.monthlyRent.findMany({
        
      });
  }
}
