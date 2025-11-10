import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseDetail } from './entities/purchase_detail.entity';
import { PurchaseDetailsService } from './purchase_details.service';
import { PurchaseDetailsController } from './purchase_details.controller';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseDetail, Purchase, Product])],
  controllers: [PurchaseDetailsController],
  providers: [PurchaseDetailsService],
  exports: [TypeOrmModule, PurchaseDetailsService],
})
export class PurchaseDetailsModule {}
