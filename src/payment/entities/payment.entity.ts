import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  method: string; 

   @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  paymentDate: Date;

  @ManyToOne(() => Purchase, (purchase) => purchase.payments)
  purchase: Purchase;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
