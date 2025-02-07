import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/module/user.module';
import { MoviesModule } from './movies/module/movies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationModule } from './reservation/module/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Charger les variables d'environnement

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')|| '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),      
    }),

    UserModule,
    MoviesModule,
    ReservationModule,
  ],
})
export class AppModule {}
