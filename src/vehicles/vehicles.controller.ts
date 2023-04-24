import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('vehicles')
@ApiBearerAuth()
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'POST create Vehicle' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'GET all Vehicles' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET Vehicle by ID' })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Get('establishments/:establishmentId')
  @ApiOperation({ summary: 'GET all Vehicles by Establishments_ID' })
  async findAllByEstablishmentId(
    @Param('establishmentId') establishmentId: number,
  ): Promise<Vehicle[]> {
    return await this.vehiclesService.findAllByEstablishmentId(establishmentId);
  }

  @Post('entry')
  @ApiOperation({ summary: 'POST Vehicles entry' })
  async registerEntry(
    @Param('establishmentId') establishmentId: number,
    @Body() vehicleData: any,
  ): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.registerEntry(
      establishmentId,
      vehicleData,
    );
    return vehicle;
  }

  @Post(':vehicleId/exit')
  @ApiOperation({ summary: 'POST Vehicles exit by ID' })
  async registerExit(
    @Param('establishmentId') establishmentId: number,
    @Param('vehicleId') vehicleId: number,
  ): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.registerExit(
      establishmentId,
      vehicleId,
    );
    return vehicle;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'PATCH Update Vehicle by ID' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETE remove vehicle by ID' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
