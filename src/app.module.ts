import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { AddressModule } from './address/address.module';
import { PaymentModule } from './payment/payment.module';
import { PurchaseDetailsModule } from './purchase_details/purchase_details.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    PaymentModule,
    CustomerModule,
    ShoppingCartModule,
    CategoryModule,
    SupplierModule,
    AddressModule,
    PurchaseDetailsModule,
    UserModule,         
    PurchaseModule, AuthModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
