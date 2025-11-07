import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  contactName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
