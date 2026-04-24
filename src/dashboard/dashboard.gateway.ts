import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DashboardGateway {
  @WebSocketServer()
  server: Server;

  private counter = 0;

  @SubscribeMessage('increment')
  handleIncrement() {
    this.counter++;
    this.server.emit('counterUpdated', this.counter);
  }

  @SubscribeMessage('decrement')
  handleDecrement() {
    this.counter--;
    this.server.emit('counterUpdated', this.counter);
  }
}
