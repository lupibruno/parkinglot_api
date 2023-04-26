import { Module, forwardRef } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from 'src/establishments/entities/establishment.entity';
import { EstablishmentsModule } from 'src/establishments/establishments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, Establishment]),
    forwardRef(() => EstablishmentsModule),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
