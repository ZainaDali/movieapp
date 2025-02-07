import { MoviesService } from '../movie-service/movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getMovies(page?: number, search?: string, sort?: string): Promise<any>;
}
