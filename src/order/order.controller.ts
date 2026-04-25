import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class orderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body('productName') productName: string,
    @Body('qantity') qantity: number,
    @Body('status') status: string,
  ) {
    return this.orderService.createOrder(productName, qantity, status);
  }
}
