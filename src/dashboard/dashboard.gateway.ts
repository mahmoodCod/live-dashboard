import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'dashboard',
  cors: {
    origin: '*',
  },
})
export class DashboardGateway {
  @WebSocketServer()
  server: Server;

  private counter = 0;

  handleConnection(client: Socket) {
    client.emit('counterUpdated', this.counter);
  }

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
