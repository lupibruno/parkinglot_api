import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstablishmentsService {
  constructor(@InjectRepository(Establishment) private establishmentsRepository: Repository<Establishment>,
  ) {}
  create(createEstablishmentDto: CreateEstablishmentDto) {
    const newEstablishment = this.establishmentsRepository.create(createEstablishmentDto)

    return this.establishmentsRepository.save(newEstablishment);
  }

  findAll() {
    return this.establishmentsRepository.find(); 
  }

  findOne(id: number) {
    return this.establishmentsRepository.findOneBy({ id });
  }

  async update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    const establishment = await this.findOne(id);

    return this.establishmentsRepository.save({ ...establishment, ...updateEstablishmentDto });
  }

  async remove(id: number) {
    const establishment = await this.findOne(id);

    return this.establishmentsRepository.remove(establishment);
  }
}
