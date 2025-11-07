import { Module } from '@nestjs/common';
import { PurchaseDetailsService } from './purchase_details.service';
import { PurchaseDetailsController } from './purchase_details.controller';

@Module({
  controllers: [PurchaseDetailsController],
  providers: [PurchaseDetailsService],
})
export class PurchaseDetailsModule {}
