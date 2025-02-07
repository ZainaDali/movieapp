import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

const url_api='https://api.themoviedb.org/3';

@Injectable()
export class MoviesService {
  private readonly url: string;
  private readonly cle: string;
  private readonly jeton: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.url = url_api;
    this.jeton = this.configService.get<string>('TMDB_Jeton') ?? '';
    this.cle = this.configService.get<string>('TMDB_cle') ?? '';
    
  }

  async getMovies(page = 1, search?: string, sort?: string) {
    let url = `${this.url}/discover/movie`;
    console.log("➡️ Sort reçu dans le backend:", sort);
    let params: any = {
      api_key: this.cle,
      page,
    };

    if (search) {
      url = `${this.url}/search/movie`;
      params.query = search;
    }

    if (sort) {
      params.sort_by = sort;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${this.jeton}`,
          },
        })
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}