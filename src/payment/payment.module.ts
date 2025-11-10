import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Purchase, User])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [TypeOrmModule, PaymentService],
})
export class PaymentModule {}
