import { Establishment } from 'src/establishments/entities/establishment.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
  
@Entity()
export class Vehicle {
@PrimaryGeneratedColumn()
id: number;

@Column()
brand: string;

@Column()
model: string;

@Column()
color: string;

@Column()
plate: string;

@Column()
type: 'car' | 'motorcycle';

@Column({ type: 'timestamp', nullable: true })
entryTime: Date;

@Column({ nullable: true })
exitTime: Date;

@Column({ nullable: true })
paid: boolean;

@ManyToOne(() => Establishment, (establishment) => establishment.vehicles)
@JoinColumn({ name: 'establishment_id' })
establishment: Establishment;
  vehicle: { id: number; };
}