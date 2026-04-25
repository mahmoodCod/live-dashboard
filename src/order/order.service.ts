import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(productName: string, qantity: number, status: string) {
    const order = this.orderRepo.create({ productName, qantity, status });
    const savedOrder = await this.orderRepo.save(order);

    return savedOrder;
  }

  async findAll() {
    return this.orderRepo.find({ order: { createAt: 'DESC' } });
  }
}
