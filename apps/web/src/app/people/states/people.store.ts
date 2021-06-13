import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Contact} from "../../../../../api/src/app/people/entities/contact.entity";
import {Classification} from "../classifications/services/classifications.store";

export interface Person {
  id?:number,
  title:string,
  firstName:string,
  middleName:string,
  lastName:string,
  gender: 'male'|'female';
  dob:Date,
  contactDetails:Contact
  classification:Classification
}

export interface PeopleState extends EntityState<Person, number> {}


@StoreConfig({name: 'people'})
@Injectable()
export class PeopleStore extends EntityStore<PeopleState>{
  constructor() {
    super()
  }
}
