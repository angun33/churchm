import {Controller} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Crud, CrudController} from "@nestjsx/crud";
import {CreateClassificationDto} from "../dtos/create-classification.dto";
import {UpdateClassificationDto} from "../dtos/update-classification.dto";
import {ClassificationEntity} from "../entities/classification.entity";
import {ClassificationsService} from "../services/classifications.service";

@Crud({
  model: { type: ClassificationEntity },
  dto: {
    create: CreateClassificationDto,
    update: UpdateClassificationDto
  },
  query: {
    sort: [
      {field: 'order', order: 'ASC'}
    ]
  }
})
@ApiTags('People')
@ApiBearerAuth()
@Controller('classifications')
export class ClassificationsController implements CrudController<ClassificationEntity> {
  constructor(public readonly service: ClassificationsService) {}
}
