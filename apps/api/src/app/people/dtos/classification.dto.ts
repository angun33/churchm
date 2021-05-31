import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Classification} from "../entities/classification.entity";


export class ClassificationDto implements Classification {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  order: number;
}
