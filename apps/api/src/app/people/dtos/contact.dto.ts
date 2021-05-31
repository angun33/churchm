import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsEmail} from "class-validator";

export class ContactDto {
  @ApiPropertyOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  mobileNo: string;

  @ApiPropertyOptional()
  homeNo: string;

  @ApiPropertyOptional()
  workNo: string
}
