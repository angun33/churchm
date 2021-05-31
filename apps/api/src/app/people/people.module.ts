import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClassificationsController} from "./controllers/classifications-controller";
import {PeopleController} from './controllers/people.controller';
import {ClassificationEntity} from "./entities/classification.entity";
import {PersonEntity} from "./entities/person.entity";
import {ClassificationsService} from "./services/classifications.service";
import {PeopleService} from './services/people.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEntity, ClassificationEntity])
  ],
  controllers: [
    PeopleController,
    ClassificationsController
  ],
  providers: [
    PeopleService,
    ClassificationsService
  ]
})
export class PeopleModule {}
