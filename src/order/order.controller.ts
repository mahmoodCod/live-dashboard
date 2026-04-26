import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders-live')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: { productName: string; quantity: number }) {
    return this.orderService.createOrder(
      body.productName,
      body.quantity,
      'pending',
    );
  }
}
