import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { DireccionModule } from './direccion/direccion.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PurchaseModule } from './details/purchase/purchase.module';
import { PaymentModule } from './payment/payment.module';
import { ShoppingModule } from './cart/shopping/shopping.module';
import { CustomerModule } from './customer/customer.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [UsuarioModule, ClienteModule, DireccionModule, ProveedorModule, CategoriaModule, ProductModule, PurchaseModule, PaymentModule, ShoppingModule, CustomerModule, ShoppingCartModule, CategoryModule, SupplierModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
