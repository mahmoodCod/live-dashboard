import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderGateway } from './order.gateway';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly orderGateway: OrderGateway,
  ) {}

  async createOrder(productName: string, qantity: number, status: string) {
    const order = this.orderRepo.create({ productName, qantity, status });
    const savedOrder = await this.orderRepo.save(order);
    this.orderGateway.emitNewOrder(savedOrder);
    return savedOrder;
  }

  async findAll() {
    return this.orderRepo.find({ order: { createAt: 'DESC' } });
  }
}
