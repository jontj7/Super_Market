// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM config para Render (Postgres) — opción rápida para escuela
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // usa la URL completa de Render
      logging: true,
      synchronize: true, // crea tablas automáticamente (ok para pruebas/escuela)
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),

    // Servir archivos estáticos (uploads) en /uploads/<filename>
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // Módulos de la app
    ProductModule,
    PaymentModule,
    CustomerModule,
    ShoppingCartModule,
    CategoryModule,
    SupplierModule,
    AddressModule,
    PurchaseDetailsModule,
    UserModule,
    PurchaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
