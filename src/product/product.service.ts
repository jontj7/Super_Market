import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/category/entities/category.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}


 
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, supplierId, imageUrl, ...data } = createProductDto;


    const product = this.productRepository.create({
      ...data,
      imageUrl: imageUrl ?? null,
      isActive: true,
    });

    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (category) product.category = category;
    }

    if (supplierId) {
      const supplier = await this.supplierRepository.findOneBy({ id: supplierId });
      if (supplier) product.supplier = supplier;
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'supplier'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'supplier'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }


  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const { categoryId, supplierId, imageUrl, ...rest } = updateProductDto;

    Object.assign(product, rest);


    if (categoryId !== undefined) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      product.category = category ?? null;
    }

    if (supplierId !== undefined) {
      const supplier = await this.supplierRepository.findOneBy({ id: supplierId });
      product.supplier = supplier ?? null;
    }

    if (imageUrl !== undefined) {
      product.imageUrl = imageUrl;
    }

    return this.productRepository.save(product);
  }


  async updateImageUrl(id: number, imageUrl: string): Promise<Product> {
    const product = await this.findOne(id);
    product.imageUrl = imageUrl;
    return this.productRepository.save(product);
  }

  
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);

    if (!product.isActive) {
      throw new NotFoundException(`Product with id ${id} is already inactive`);
    }

    product.isActive = false;
    await this.productRepository.save(product);

    return { message: `Product with id ${id} has been deactivated` };
  }
}
