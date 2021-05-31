import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Repository} from "typeorm";
import {PersonEntity} from "../entities/person.entity";

@Injectable()
export class PeopleService extends TypeOrmCrudService<PersonEntity> {
  constructor(@InjectRepository(PersonEntity) public readonly repo:Repository<PersonEntity>) {
    super(repo);
  }
}
