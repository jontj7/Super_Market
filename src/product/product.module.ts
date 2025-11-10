import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';
import { SupplierModule } from 'src/supplier/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Supplier]),
    CategoryModule,
    SupplierModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
