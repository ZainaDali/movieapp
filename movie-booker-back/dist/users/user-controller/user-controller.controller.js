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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const register_dto_1 = require("./Dto/register.dto");
const login_dto_1 = require("./Dto/login.dto");
const user_service_service_1 = require("../user-service/user-service.service");
const jwt_auth_guard_1 = require("../../users/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(registerDto) {
        const user = await this.userService.register(registerDto);
        return { message: 'Inscription valide', data: user };
    }
    async login(loginDto) {
        const token = await this.userService.login(loginDto);
        return { message: 'Connexion valide', ...token };
    }
    async getProfile(req) {
        const userId = req.user.id;
        const user = await this.userService.getUserWithReservations(userId);
        if (user) {
            return {
                message: "Profil et réservations récupérés avec succès",
                user: {
                    id: user.id,
                    email: user.email,
                    reservations: user.reservations.map(reservation => ({
                        id: reservation.id,
                        id_movie: reservation.id_movie,
                        debut: reservation.debut,
                        fin: reservation.fin,
                    })),
                }
            };
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_2.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: "Création d'un compte utilisateur" }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_2.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Connexion' }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_2.Get)('profile'),
    (0, common_3.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Profile utilisateur connecté" }),
    __param(0, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Authentification'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_service_1.UserService])
], UserController);
//# sourceMappingURL=user-controller.controller.js.map