import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger/dist';

@ApiTags('establishments')
@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  @ApiOperation({ summary: 'POST Create Establishment' })
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentsService.create(createEstablishmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'GET all Establishment' })
  findAll() {
    return this.establishmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET Establishment by ID' })
  findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'PATCH Update Establishment by ID' })
  update(@Param('id') id: string, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentsService.update(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETE delete Establishment by ID' })
  remove(@Param('id') id: string) {
    return this.establishmentsService.remove(+id);
  }
}
