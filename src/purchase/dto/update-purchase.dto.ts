import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePurchaseDto {
  @IsOptional()
  @IsNumber()
  total?: number;
}
