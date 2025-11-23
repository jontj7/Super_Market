import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  stock: number;

  @Transform(({ value }) => value ? String(value) : undefined)
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Transform(({ value }) => value ? Number(value) : undefined)
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @Transform(({ value }) => value ? Number(value) : undefined)
  @IsOptional()
  @IsNumber()
  supplierId?: number;
}
