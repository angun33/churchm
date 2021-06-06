import {ChangeDetectionStrategy, Component, Input, EventEmitter, Output} from '@angular/core';
import {PaginationResponse} from "@datorama/akita";
import {PeopleState, Person} from "../states/people.store";

@Component({
  selector: 'people-list',
  templateUrl: 'people-list.component.html',
  styleUrls: ['people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent {
  @Input() pagination:PaginationResponse<PeopleState>;
  @Input() isLoading:boolean = false;
  @Output() page = new EventEmitter();
  @Output() delete = new EventEmitter();

  columns = ['firstName', 'lastName', 'email', 'mobileNo', 'classification', 'actions'];

  private confirmDeletePerson:Person = null;

  constructor() {}

  tryDelete(person) {
    this.confirmDeletePerson = person;
  }

  clearConfirm() {
    this.confirmDeletePerson = null;
  }

  confirm() {
    if (this.confirmDeletePerson !== null) {
      this.delete.emit(this.confirmDeletePerson);
      this.confirmDeletePerson = null;
    }
  }
}
