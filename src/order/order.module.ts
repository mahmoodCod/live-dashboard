import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { orderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [orderController],
  providers: [OrderGateway, OrderService],
})
export class OrderModule {}
