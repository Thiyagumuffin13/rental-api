import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    const { rentPrice, ebPrice, waterPrice, rentalInitiationDate } = receiptStructure;

    const ebUnitCharges = (currentEbUnit - pastEbUnit) * ebPrice;

    const totalRentPrice = rentPrice + ebUnitCharges + (waterPrice * familyMembers);

    const totalMonthStayed = this.calculateMonthsStayed(new Date(rentalInitiationDate), new Date());

    const { billingStartDate, billingEndDate  } = this.calculateStartAndEndDate(new Date(rentalInitiationDate), totalMonthStayed);

    const monthlyRent = await this.dbService.monthlyRent.create({
      data: {
        // also save rentprice, their from & to date, also month count of every day. try to save the past ebunit in receiptstru instead of geting in input post
        pastEbUnit: pastEbUnit,
        currentEbUnit: currentEbUnit,
        ebUnitCharges: ebUnitCharges,
        familyMembers: familyMembers,
        totalRentPrice: totalRentPrice,
        receiptStructureId: receiptStructure.id,
        totalMonthStayed: totalMonthStayed,
        billingStartDate: billingStartDate,
        billingEndDate: billingEndDate,
        rentPrice :  receiptStructure.rentPrice,
        userId: userId,
      },
    });

    return monthlyRent;
  }

  async getAll(){
    try {
      const rents = await this.dbService.monthlyRent.findMany();
      
      if (!rents || rents.length === 0) {
        throw new NotFoundException('No entries found in the monthlyRent table');
      }
      
      return rents;
    } catch (error) {
      console.error('Error fetching monthly rents:', error.message);
      throw new InternalServerErrorException('Error fetching monthly rents');
    }
  }

  private calculateMonthsStayed(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }

  private calculateStartAndEndDate(rentalInitiationDate: Date, monthsToAdd: number): { billingStartDate: Date, billingEndDate: Date } {
    const billingStartDate = new Date(rentalInitiationDate);
    billingStartDate.setMonth(billingStartDate.getMonth() + monthsToAdd);
    
    const billingEndDate = new Date(billingStartDate);
    billingEndDate.setMonth(billingStartDate.getMonth() + 1);

    return { billingStartDate, billingEndDate };
  }
}
