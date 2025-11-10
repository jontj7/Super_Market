import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Product } from 'src/product/entities/product.entity';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Product])], // 👈 se agregó Product aquí
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [TypeOrmModule, SupplierService],
})
export class SupplierModule {}
