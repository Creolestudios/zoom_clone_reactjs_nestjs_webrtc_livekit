import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoCallingModule } from './video-calling/video-calling.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [VideoCallingModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
