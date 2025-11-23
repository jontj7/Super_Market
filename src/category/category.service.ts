import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Crear categoría
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // Obtener todas las categorías con sus productos
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['products'],
      order: { id: 'ASC' },
    });
  }

  // Buscar una categoría por id
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  // Actualizar categoría
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }


 async remove(id: number): Promise<{ message: string }> {
    const category = await this.findOne(id);

    if (!category.isActive) {
      throw new NotFoundException(`Category with id ${id} is already inactive`);
    }

    category.isActive = false;
    await this.categoryRepository.save(category);

    return { message: `Category with id ${id} has been deactivated` };
  }
}
