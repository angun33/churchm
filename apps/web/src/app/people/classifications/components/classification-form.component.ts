import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'classification-form',
  templateUrl: 'classification-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationFormComponent {
  @Input() form:FormGroup;
  @Input() mode:'new'|'edit'|'closed' = 'new'
  @Output() save:EventEmitter<void> = new EventEmitter();
  @Output() reset:EventEmitter<void> = new EventEmitter();
  constructor() {
  }
}
