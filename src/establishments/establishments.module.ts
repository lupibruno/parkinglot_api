import { Module, forwardRef } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Establishment, Vehicle]),
    forwardRef(() => VehiclesModule)
   ],
  controllers: [EstablishmentsController],
  providers: [EstablishmentsService],
  exports: [EstablishmentsService]
})
export class EstablishmentsModule {}