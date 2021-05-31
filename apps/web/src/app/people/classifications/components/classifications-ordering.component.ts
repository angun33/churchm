import {CdkDragDrop} from "@angular/cdk/drag-drop/drag-events";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Classification} from "../services/classifications.store";

@Component({
  selector: 'classifications-ordering',
  templateUrl: 'classifications-ordering.component.html',
  styleUrls: ['classifications-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassificationsOrderingComponent {
  @Input() classifications:Classification[];
  @Output() reorder:EventEmitter<CdkDragDrop<any>> = new EventEmitter();
  @Output() edit:EventEmitter<Classification> = new EventEmitter();
  @Output() delete:EventEmitter<Classification> = new EventEmitter();

  private confirmDelete = null;

  constructor() {
  }

  confirm() {
    if (this.confirmDelete !== null)
      this.delete.emit(this.confirmDelete)
  }

  clearConfirm() {
    this.confirmDelete = null;
  }

  _delete(classification) {
    this.confirmDelete = classification;
  }
}
