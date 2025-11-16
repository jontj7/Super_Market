import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingCartDto } from './create-shopping_cart.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateShoppingCartDto {
  @IsOptional()
  @IsNumber()
  productId?: number;  

  @IsOptional()
  @IsNumber()
  customerId?: number; 

  @IsOptional()
  @IsNumber()
  quantity?: number;
}