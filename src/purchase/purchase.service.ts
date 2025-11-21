import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { PurchaseDetail } from 'src/purchase_details/entities/purchase_detail.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(PurchaseDetail)
    private readonly detailRepository: Repository<PurchaseDetail>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { customerId, userId, total, details } = createPurchaseDto;

      // Obtener customer y user
      const customer = await queryRunner.manager.findOne(Customer, { where: { id: customerId } });
      if (!customer) throw new NotFoundException('Customer not found');

      const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      // Crear compra
      const purchase = queryRunner.manager.create(Purchase, { customer, user, total });

      const detailEntities: PurchaseDetail[] = [];

      // Iterar detalles de la compra
      for (const d of details) {
        const product = await queryRunner.manager.findOne(Product, { where: { id: d.productId } });
        if (!product) throw new NotFoundException(`Product #${d.productId} not found`);

        if (product.stock < d.quantity) {
          throw new Error(`Not enough stock for product ${product.name}`);
        }

        // Restar stock y guardar
        product.stock -= d.quantity;
        await queryRunner.manager.save(product);

        // Crear detalle
        const detail = queryRunner.manager.create(PurchaseDetail, {
          product,
          quantity: d.quantity,
          subtotal: d.subtotal,
        });

        detailEntities.push(detail);
      }

      // Asignar detalles a la compra
      purchase.details = detailEntities;

      // Guardar compra y detalles
      const savedPurchase = await queryRunner.manager.save(purchase);

      await queryRunner.commitTransaction();
      return savedPurchase;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      relations: ['customer', 'user', 'details', 'details.product', 'payments'],
    });
  }

  async findOne(id: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id },
      relations: ['customer', 'user', 'details', 'details.product', 'payments'],
    });

    if (!purchase) throw new NotFoundException(`Purchase #${id} not found`);
    return purchase;
  }

  async update(id: number, updateDto: UpdatePurchaseDto): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({ where: { id } });
    if (!purchase) throw new NotFoundException('Purchase not found');

    Object.assign(purchase, updateDto);
    return this.purchaseRepository.save(purchase);
  }

  async remove(id: number): Promise<{ message: string }> {
    const purchase = await this.findOne(id);

    if (!purchase.isActive) {
      throw new NotFoundException(`Purchase with id ${id} is already inactive`);
    }

    purchase.isActive = false;
    await this.purchaseRepository.save(purchase);
    return { message: `Purchase with id ${id} has been deactivated` };
  }
}


