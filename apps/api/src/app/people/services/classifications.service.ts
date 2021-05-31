import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Repository} from "typeorm";
import {ClassificationEntity} from "../entities/classification.entity";

@Injectable()
export class ClassificationsService extends TypeOrmCrudService<ClassificationEntity> {
  constructor(@InjectRepository(ClassificationEntity) public readonly repo:Repository<ClassificationEntity>) {
    super(repo);
  }
}

