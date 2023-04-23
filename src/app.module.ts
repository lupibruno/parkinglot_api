import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentsModule } from './establishments/establishments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
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
    VehiclesModule 
  ],
  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule {}
