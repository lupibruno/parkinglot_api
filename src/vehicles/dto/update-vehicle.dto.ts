import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
    readonly brand?: string;
    readonly model?: string;
    readonly color?: string;
    readonly plate?: string;
    readonly vehicleType?: 'car' | 'motorcycle' ;
}
