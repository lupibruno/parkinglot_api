import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablishmentDto } from './create-establishment.dto';

export class UpdateEstablishmentDto extends PartialType(CreateEstablishmentDto) {
    readonly phone?: string;
    readonly motorcycleSpaces?: number;
    readonly carSpaces?: number;
}
