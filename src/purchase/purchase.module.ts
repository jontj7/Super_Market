import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseDetail } from 'src/purchase_details/entities/purchase_detail.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      PurchaseDetail,
      Customer,
      Product,
      User, 
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [TypeOrmModule, PurchaseService],
})
export class PurchaseModule {}
