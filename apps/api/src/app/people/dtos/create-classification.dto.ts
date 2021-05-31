import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Classification} from "../entities/classification.entity";

export class CreateClassificationDto implements Omit<Classification, 'id'> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  order: number;
}
