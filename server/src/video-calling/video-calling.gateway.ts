import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { VideoCallingService } from './video-calling.service';
import * as chalk from 'chalk';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class VideoCallingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly videoCallingService: VideoCallingService) {}

  @WebSocketServer()
  private server: Server;

  afterInit(server: any) {
    console.log(chalk.cyan('Server is initialized'));
  }

  async handleConnection(client: any, ...args: any[]) {
    console.log(chalk.green(client.id, 'is connected to server'));
  }

  handleDisconnect(client: any) {
    console.log(client.id, 'is disconnected to server');
  }

  @SubscribeMessage('create-token')
  async createToken(@MessageBody() data: string) {
    const { token, participants } =
      await this.videoCallingService.createToken(data);

    this.server.emit('participant-connect', participants);
    return token;
  }

  @SubscribeMessage('get-participant')
  async getParticipant(@MessageBody() data: any) {
    this.server
      // .to(data)
      .emit(
        'get-participants',
        await this.videoCallingService.participantList(data),
      );
    // return this.videoCallingService.participantList(data);
  }

  @SubscribeMessage('send-message')
  async sendTo(@MessageBody() data: any) {
    return this.videoCallingService.sendToParticipants(data);
  }
}
