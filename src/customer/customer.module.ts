import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Address } from 'src/address/entities/address.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Address])], 
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule, CustomerService],
})
export class CustomerModule {}
