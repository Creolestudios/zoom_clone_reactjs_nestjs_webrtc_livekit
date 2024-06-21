import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import * as chalk from 'chalk';
import { Server } from 'socket.io';
import {
  AccessToken,
  DataPacket_Kind,
  RoomServiceClient,
} from 'livekit-server-sdk';

@Injectable()
export class VideoCallingService {
  private roomService = new RoomServiceClient(
    process.env.LIVEKIT_HOST,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
  );
  async createToken(data) {
    const roomName = 'first-room';

    let token: any = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        name: data.username,
        identity: data.username,
        metadata: roomName,
      },
    );

    token.addGrant({ room: roomName, roomJoin: true });

    token = await token.toJwt();

    const participants = await this.participantList(roomName);

    return { token, participants };
  }

  async participantList(room) {
    let participants: any = await this.roomService.listParticipants(room);
    participants = participants.map((e) => e.identity);


    return participants;
  }

  async sendToParticipants(data) {
    const decoder = new TextDecoder();
    const messageData = decoder.decode(data);

    const message = JSON.parse(messageData);

    await roomServiceClient.sendData(
      message.room,
      data,
      DataPacket_Kind.RELIABLE,
      { destinationIdentities: [] },
    );
  }
}
