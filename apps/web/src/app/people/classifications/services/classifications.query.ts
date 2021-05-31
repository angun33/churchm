import {Injectable} from "@angular/core";
import {QueryEntity} from "@datorama/akita";
import {ClassificationsState, ClassificationsStore} from "./classifications.store";

@Injectable()
export class ClassificationsQuery extends QueryEntity<ClassificationsState> {

  constructor(protected store: ClassificationsStore) {
    super(store)
  }
}
