import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => value !== undefined ? Number(value) : undefined)
  @IsOptional()
  @IsNumber()
  price?: number;

  @Transform(({ value }) => value !== undefined ? Number(value) : undefined)
  @IsOptional()
  @IsNumber()
  stock?: number;

  @Transform(({ value }) => value !== undefined ? Number(value) : undefined)
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @Transform(({ value }) => value !== undefined ? Number(value) : undefined)
  @IsOptional()
  @IsNumber()
  supplierId?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
