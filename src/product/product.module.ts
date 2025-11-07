import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Category } from 'src/category/entities/category.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { PurchaseDetail } from 'src/purchase_details/entities/purchase_detail.entity';
import { ShoppingCart } from 'src/shopping_cart/entities/shopping_cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Supplier, PurchaseDetail, ShoppingCart]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
