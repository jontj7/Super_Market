import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['purchases', 'payments'],
    });
  }

  // Find one user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['purchases', 'payments'],
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  // Update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

 async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (!user.isActive) {
      throw new NotFoundException(`User with id ${id} is already inactive`);
    }

    user.isActive = false;
    await this.userRepository.save(user);

    return { message: `User with id ${id} has been deactivated` };
  }
}

