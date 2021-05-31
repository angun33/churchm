import {Injectable} from '@angular/core';
import {NgEntityService, NgEntityServiceConfig} from "@datorama/akita-ng-entity-service";
import {ClassificationsState, ClassificationsStore} from "./classifications.store";

@NgEntityServiceConfig({
  resourceName: 'classifications'
})
@Injectable()
export class ClassificationsService extends NgEntityService<ClassificationsState> {
  constructor(protected store: ClassificationsStore) {
    super(store)
  }
}
