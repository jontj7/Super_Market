import { Injectable } from '@nestjs/common';
import { CreatePurchaseDetailDto } from './dto/create-purchase_detail.dto';
import { UpdatePurchaseDetailDto } from './dto/update-purchase_detail.dto';

@Injectable()
export class PurchaseDetailsService {
  create(createPurchaseDetailDto: CreatePurchaseDetailDto) {
    return 'This action adds a new purchaseDetail';
  }

  findAll() {
    return `This action returns all purchaseDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseDetail`;
  }

  update(id: number, updatePurchaseDetailDto: UpdatePurchaseDetailDto) {
    return `This action updates a #${id} purchaseDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseDetail`;
  }
}
