import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { PurchaseDetail } from 'src/purchase_details/entities/purchase_detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      Supplier,
      PurchaseDetail,
      Product,
      Customer, 
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [TypeOrmModule, PurchaseService],
})
export class PurchaseModule {}
