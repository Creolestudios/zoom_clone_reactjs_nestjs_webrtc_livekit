import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createToken(data) {
    const roomName = 'first-room';

    let token: any = new AccessToken();

    token.addGrant({ room: roomName, roomJoin: true });

    token = await token.toJwt();
    return token;
  }
}
