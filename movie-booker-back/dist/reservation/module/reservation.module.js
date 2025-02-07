"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModule = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("../reservation-service/reservation.service");
const reservation_controller_1 = require("../reservation-controller/reservation.controller");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let ReservationModule = class ReservationModule {
};
exports.ReservationModule = ReservationModule;
exports.ReservationModule = ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([reservation_entity_1.Reservation, user_entity_1.User]),
            jwt_1.JwtModule.register({}),
        ],
        providers: [reservation_service_1.ReservationService],
        controllers: [reservation_controller_1.ReservationController]
    })
], ReservationModule);
//# sourceMappingURL=reservation.module.js.map