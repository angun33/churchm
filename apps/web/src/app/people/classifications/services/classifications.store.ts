import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";

export interface Classification {
  id?: number,
  name: string,
  order: number
}

export interface ClassificationsState extends EntityState<Classification, number> {
  mode: 'new'|'edit'|'closed'
}

const initialState:ClassificationsState = {
  mode: 'closed'
}

@StoreConfig({name: 'classifications'})
@Injectable()
export class ClassificationsStore extends EntityStore<ClassificationsState> {
  constructor() {
    super(initialState);
  }
}

