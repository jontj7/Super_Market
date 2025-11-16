import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly cartRepository: Repository<ShoppingCart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateShoppingCartDto): Promise<ShoppingCart> {
    const { productId, customerId, quantity } = dto;

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    if (quantity > product.stock) {
      throw new BadRequestException('Insufficient product stock');
    }

    const item = this.cartRepository.create({
      product,
      customer,
      quantity,
    });

    return this.cartRepository.save(item);
  }

  async findAll(): Promise<ShoppingCart[]> {
    return this.cartRepository.find({
      relations: ['product', 'customer'],
    });
  }

  async findOne(id: number): Promise<ShoppingCart> {
    const cartItem = await this.cartRepository.findOne({
      where: { id },
      relations: ['product', 'customer'],
    });
    if (!cartItem) throw new NotFoundException(`Cart item #${id} not found`);
    return cartItem;
  }

async update(id: number, updateDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
  const cartItem = await this.cartRepository.findOne({
    where: { id },
    relations: ['product', 'customer'],
  });

  if (!cartItem) {
    throw new NotFoundException(`Shopping cart item with id ${id} not found`);
  }

 
  if (updateDto.productId) {
    const product = await this.productRepository.findOneBy({ id: updateDto.productId });
    if (!product) throw new NotFoundException(`Product with id ${updateDto.productId} not found`);
    cartItem.product = product;
  }

  if (updateDto.customerId) {
    const customer = await this.customerRepository.findOneBy({ id: updateDto.customerId });
    if (!customer) throw new NotFoundException(`Customer with id ${updateDto.customerId} not found`);
    cartItem.customer = customer;
  }

  if (updateDto.quantity !== undefined) {
    cartItem.quantity = updateDto.quantity;
  }

  const saved = await this.cartRepository.save(cartItem);

  const updated = await this.cartRepository.findOne({
    where: { id: saved.id },
    relations: ['product', 'customer'],
  });

  if (!updated) {
    throw new NotFoundException(`Failed to retrieve updated cart item`);
  }

  return updated;
}

 async remove(id: number): Promise<{ message: string }> {
    const shopping = await this.findOne(id);

    if (!shopping.isActive) {
      throw new NotFoundException(`Shopping with id ${id} is already inactive`);
    }

    shopping.isActive = false;
    await this.cartRepository.save(shopping);

    return { message: `Shopping with id ${id} has been deactivated` };
  }
}
