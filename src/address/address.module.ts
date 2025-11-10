import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Customer])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule, AddressService],
})
export class AddressModule {}
