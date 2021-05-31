import {Injectable} from '@angular/core';
import {NgEntityService, NgEntityServiceConfig} from "@datorama/akita-ng-entity-service";
import {PeopleState, PeopleStore} from "../states/people.store";

@NgEntityServiceConfig({
  resourceName: 'people'
})
@Injectable()
export class PeopleService extends NgEntityService<PeopleState> {
  constructor(protected store: PeopleStore) {
    super(store)
  }

  getOne(id) {
    const mapResponseFn = (person) => ({
      ...person,
      dob: new Date(person.dob),
      createdAt: new Date(person.createdAt),
      updatedAt: new Date(person.updatedAt)
    });
    return this.get(id, {mapResponseFn})
  }
}
