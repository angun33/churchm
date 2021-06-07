import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDate, IsIn, MinLength, ValidateIf} from "class-validator";
import {Gender, Person} from "../entities/person.entity";
import {ClassificationDto} from "./classification.dto";
import {ContactDto} from "./contact.dto";

export class CreatePersonDto implements Omit<Person, 'id'> {
  @ApiProperty()
  @IsIn(['male', 'female'])
  gender: Gender

  @ApiPropertyOptional()
  title: string

  @ApiProperty()
  @MinLength(2)
  firstName:string

  @ApiPropertyOptional()
  middleName:string

  @ApiPropertyOptional()
  lastName:string

  @ApiPropertyOptional()
  contactDetails: ContactDto

  @ApiPropertyOptional()
  @Type(() => Date)
  @ValidateIf(data => data.dob !== null && data.dob !== '' )
  @IsDate({message: 'dob is not a correct date format'})
  dob:Date

  @ApiPropertyOptional()
  classification: ClassificationDto
}
