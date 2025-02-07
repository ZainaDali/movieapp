"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const url_api = 'https://api.themoviedb.org/3';
let MoviesService = class MoviesService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.url = url_api;
        this.jeton = this.configService.get('TMDB_Jeton') ?? '';
        this.cle = this.configService.get('TMDB_cle') ?? '';
    }
    async getMovies(page = 1, search, sort) {
        let url = `${this.url}/discover/movie`;
        console.log("➡️ Sort reçu dans le backend:", sort);
        let params = {
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
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                params,
                headers: {
                    Authorization: `Bearer ${this.jeton}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map