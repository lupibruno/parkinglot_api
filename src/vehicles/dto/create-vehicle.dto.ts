export class CreateVehicleDto {
    readonly brand: string;
    readonly model: string;
    readonly color: string;
    readonly plate: string;
    readonly vehicleType: 'car' | 'motorcycle' ;
}
