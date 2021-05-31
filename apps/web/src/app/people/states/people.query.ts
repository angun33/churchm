import {Injectable} from '@angular/core';
import {QueryEntity} from "@datorama/akita";
import {PeopleState, PeopleStore} from "./people.store";

@Injectable()
export class PeopleQuery extends QueryEntity<PeopleState> {

  constructor(protected store: PeopleStore) {
    super(store)
  }
}
