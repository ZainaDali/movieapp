import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from '../movie-service/movies.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Films')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer une liste de films avec pagination, recherche et tri' })
  getMovies(
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('sort_by') sort?: string
  ) {
    return this.moviesService.getMovies(page, search, sort);
  }
}
