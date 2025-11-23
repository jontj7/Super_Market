import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { purchaseId, userId, amount, method } = createPaymentDto;

    const purchase = await this.purchaseRepository.findOne({ where: { id: purchaseId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!purchase) throw new NotFoundException('Purchase not found');
    if (!user) throw new NotFoundException('User not found');

    const payment = this.paymentRepository.create({
      amount,
      method,
      purchase,
      user,
    });

    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['purchase', 'user'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['purchase', 'user'],
    });

    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  async update(id: number, updateDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, updateDto);
    return this.paymentRepository.save(payment);
  }

 async remove(id: number): Promise<{ message: string }> {
    const payment = await this.findOne(id);

    if (!payment.isActive) {
      throw new NotFoundException(`Payment with id ${id} is already inactive`);
    }

    payment.isActive = false;
    await this.paymentRepository.save(payment);
    return { message: `Payment with id ${id} has been deactivated` };
  }
}

