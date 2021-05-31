import {Controller} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Crud, CrudController} from "@nestjsx/crud";
import {CreatePersonDto} from '../dtos/create-person.dto';
import {UpdatePersonDto} from '../dtos/update-person.dto';
import {PersonEntity} from "../entities/person.entity";
import {PeopleService} from '../services/people.service';

@Crud({
  model: { type: PersonEntity },
  dto: {
    create: CreatePersonDto,
    update: UpdatePersonDto
  },
  query: {
    join: {
      classification: {
        eager: true
      }
    },
    maxLimit: 100,
    alwaysPaginate: true
  }
})
@ApiTags('People')
@ApiBearerAuth()
@Controller('people')
export class PeopleController implements CrudController<PersonEntity> {
  constructor(public readonly service: PeopleService) {}
}
