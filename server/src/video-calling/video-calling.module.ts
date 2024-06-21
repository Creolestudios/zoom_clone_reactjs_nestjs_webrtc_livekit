import { Module } from '@nestjs/common';
import { VideoCallingService } from './video-calling.service';
import { VideoCallingGateway } from './video-calling.gateway';

@Module({
  providers: [VideoCallingGateway, VideoCallingService],
})
export class VideoCallingModule {}
