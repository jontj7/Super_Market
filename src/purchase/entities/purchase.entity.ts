import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { PurchaseDetail } from 'src/purchase_details/entities/purchase_detail.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Customer, (customer) => customer.purchases)
  customer: Customer;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @OneToMany(() => PurchaseDetail, (detail) => detail.purchase, { cascade: true })
  details: PurchaseDetail[];

  @OneToMany(() => Payment, (payment) => payment.purchase)
  payments: Payment[];
}
