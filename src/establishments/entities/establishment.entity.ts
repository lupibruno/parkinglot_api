import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';

@Entity()
export class Establishment {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  motorcycleSpots: number;

  @Column()
  carSpots: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.establishment)
  vehicles: Vehicle[];
}
