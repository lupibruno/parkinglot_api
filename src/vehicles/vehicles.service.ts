import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { Establishment } from 'src/establishments/entities/establishment.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) 
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Establishment)
    private establishmentsRepository: Repository<Establishment>,
) {}
  create(createVehicleDto: CreateVehicleDto) {
    const newVehicle = this.vehiclesRepository.create(createVehicleDto)

    return this.vehiclesRepository.save(newVehicle);
  }

  findAll() {
    return this.vehiclesRepository.find();
  }

  findOne(id: number) {
    return this.vehiclesRepository.findOneBy({ id });
  }

  async findAllByEstablishmentId(establishmentId: number): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find({
      where: { establishment: { id: establishmentId } },
    });
  }
  
  async registerEntry(establishmentId: number, data: any): Promise<Vehicle> {
    const establishment = await this.establishmentsRepository.findOne(
      { where: { id: establishmentId } }
    );
    const vehicle = new Vehicle();
    vehicle.brand = data.brand;
    vehicle.model = data.model;
    vehicle.color = data.color;
    vehicle.plate = data.plate;
    vehicle.type = data.type;
    vehicle.entryTime = new Date();
    vehicle.establishment = establishment;
    return await this.vehiclesRepository.save(vehicle);
  }

  async registerExit(
    establishmentId: number,
    vehicleId: number,
  ): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id: vehicleId, establishment: { id: establishmentId } },
    });
    vehicle.exitTime = new Date();
    return await this.vehiclesRepository.save(vehicle);
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id);

    return this.vehiclesRepository.save({ ...vehicle, ...updateVehicleDto });
  }

  async remove(id: number) {
    const vehicle = await this.findOne(id);

    return this.vehiclesRepository.remove(vehicle);
  }
}
