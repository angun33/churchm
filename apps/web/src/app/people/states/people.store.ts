import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";

export interface Person {

}

export interface PeopleState extends EntityState<Person, number> {}


@StoreConfig({name: 'people'})
@Injectable()
export class PeopleStore extends EntityStore<PeopleState>{
  constructor() {
    super()
  }
}
