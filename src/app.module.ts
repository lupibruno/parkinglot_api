import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentsModule } from './establishments/establishments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    EstablishmentsModule,
    VehiclesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
