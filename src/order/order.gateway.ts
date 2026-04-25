import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OrderService } from './order.service';
import { Server } from 'socket.io';
import { Order } from './entities/order.entity';
import { Socket } from 'socket.io-client';

@WebSocketGateway({
  namespace: 'orders-live',
  cors: {
    origin: '*',
  },
})
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  private ordersCash: Order[] = [];

  handleConnection(client: Socket) {
    client.emit('initialOrders', this.ordersCash);
  }

  emitNewOrder(order: Order) {
    this.ordersCash.unshift(order);
    this.server.emit('newOrder', order);
  }
}
