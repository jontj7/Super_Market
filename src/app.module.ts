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
      url: process.env.DATABASE_URL,
      logging: true,
      synchronize: true, // ok para escuela; cambia a false y usa migraciones cuando vayas a prod serio
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // Configura ssl condicional: si DATABASE_SSL === 'true' usa ssl con rejectUnauthorized=false,
      // si no, no pases ssl (pg realizará conexión sin SSL)
      ...(process.env.DATABASE_SSL === 'true'
        ? {
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          }
        : {}),
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
