import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder} from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const swagger = new DocumentBuilder()
    .setTitle('MovieBooker API') 
    .setDescription('API pour la gestion des utilisateurs et l\'authentification') 
    .setVersion('1.0') 
    .addBearerAuth() 
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api/doc', app, swaggerDocument); 
  await app.listen(3000);
}

bootstrap();
