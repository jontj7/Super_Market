import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartController } from './shopping_cart.controller';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, Product, Customer])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [TypeOrmModule, ShoppingCartService],
})
export class ShoppingCartModule {}
