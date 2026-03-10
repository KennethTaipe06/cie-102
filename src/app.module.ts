import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Cie10Schema } from './infrastructure/adapters/persistence/cie10.schema';
import { Cie10Controller } from './infrastructure/adapters/http/cie10.controller';
import { TypeOrmCie10Repository } from './infrastructure/adapters/persistence/typeorm-cie10.repository';
import { CIE10_REPOSITORY } from './domain/repositories/cie10.repository.port';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres123',
      database: process.env.DB_NAME || 'agnodishub',
      entities: [Cie10Schema],
      synchronize: false, // Importante: ya tenemos los datos y la tabla
    }),
    TypeOrmModule.forFeature([Cie10Schema]),
  ],
  controllers: [Cie10Controller],
  providers: [
    {
      provide: CIE10_REPOSITORY,
      useClass: TypeOrmCie10Repository,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
