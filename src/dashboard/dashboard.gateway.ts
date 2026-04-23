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
  handleIncreament() {}
}
