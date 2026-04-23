import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class DashboardGateway {
  @WebSocketServer()
  server: Server;

  private counter = 0;

  @SubscribeMessage('increment')
  handleIncreament() {
    this.counter++;
    this.server.emit('counter Updated', this.counter);
  }

  @SubscribeMessage('decrement')
  handleDecreament() {
    this.counter--;
    this.server.emit('counter Updated', this.counter);
  }
}
