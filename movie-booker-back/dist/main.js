"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    const swagger = new swagger_1.DocumentBuilder()
        .setTitle('MovieBooker API')
        .setDescription('API pour la gestion des utilisateurs et l\'authentification')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_2.SwaggerModule.createDocument(app, swagger);
    swagger_2.SwaggerModule.setup('api/doc', app, swaggerDocument);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map