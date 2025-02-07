import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MoviesService } from '../movie-service/movies.service';
import { MoviesController } from '../movie-controller/movies.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
