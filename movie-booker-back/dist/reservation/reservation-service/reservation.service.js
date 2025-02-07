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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let ReservationService = class ReservationService {
    constructor(repo_reservation, repo_user) {
        this.repo_reservation = repo_reservation;
        this.repo_user = repo_user;
    }
    async reserver_film(id_user, id_movie, debut) {
        const fin = new Date(debut);
        fin.setHours(fin.getHours() + 2);
        const verif_reservation = await this.repo_reservation.findOne({
            where: [
                { user: { id: id_user }, debut: (0, typeorm_2.Between)(debut, fin) },
                { user: { id: id_user }, fin: (0, typeorm_2.Between)(debut, fin) },
                { user: { id: id_user }, debut: (0, typeorm_2.LessThan)(fin), fin: (0, typeorm_2.MoreThan)(debut) }
            ],
        });
        if (verif_reservation) {
            throw new common_1.ConflictException('une réservation existe deja à cet horaire');
        }
        const user = await this.repo_user.findOne({ where: { id: id_user } });
        if (user) {
            const reservation = this.repo_reservation.create({
                user,
                id_movie,
                debut,
                fin,
            });
            return await this.repo_reservation.save(reservation);
        }
        else {
            throw new common_1.NotFoundException('veuillez vous connectez');
        }
    }
    async get_reservation(userId) {
        return await this.repo_reservation.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }
    async annuler_reservation(reservationId) {
        const reservation = await this.repo_reservation.findOne({
            where: { id: reservationId },
        });
        if (reservation) {
            await this.repo_reservation.remove(reservation);
            return { message: 'la réservation est annulée' };
        }
        else {
            throw new common_1.NotFoundException("la réservation n'existe pas");
        }
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map