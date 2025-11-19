import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Request } from 'express';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

 
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (_req, file, cb) => {
          const unique = uuidv4();
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (_req, file, cb) => {
        const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new BadRequestException('Only images allowed'), false);
      },
    }),
  )
  async createWithImage(
    @Body() body: any,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    let imageUrl: string | undefined = undefined;

    if (image) {
      const host = req.get('host');
      imageUrl = `${req.protocol}://${host}/uploads/products/${image.filename}`;
    }

    const createProductDto = {
      ...body,
      price: Number(body.price),
      stock: Number(body.stock),
      categoryId: body.categoryId ? Number(body.categoryId) : undefined,
      supplierId: body.supplierId ? Number(body.supplierId) : undefined,
      imageUrl,
    };

    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(+id, body);
  }


  @Patch('upload-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (_req, file, cb) => {
          const unique = uuidv4();
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  async updateWithImage(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Req() req: Request,
  ) {
    let imageUrl: string | undefined = undefined;

    if (image) {
      const host = req.get('host');
      imageUrl = `${req.protocol}://${host}/uploads/products/${image.filename}`;
    }

    return this.productService.update(+id, { imageUrl });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
