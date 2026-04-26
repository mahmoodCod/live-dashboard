import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Order } from './entities/order.entity';

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
