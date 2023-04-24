import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentsModule } from './establishments/establishments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'parkinglotapi',
      username: 'root',
      password: 'dev123',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
  }),
    EstablishmentsModule, 
    VehiclesModule, AuthModule, UsersModule 
  ],
  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule {}
