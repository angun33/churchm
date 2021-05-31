import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {isValid} from "date-fns";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {DateMask} from "../directives/masks.utils";

@Component({
  selector: 'date-input',
  templateUrl: 'date-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'width: 100%'
  }
})
export class DateInputComponent implements OnInit, OnDestroy {
  @Input() control:AbstractControl
  @Input() label:string

  public dateMask = new DateMask();
  public _hiddenControl:FormControl = new FormControl();

  private _subscriptions:Subscription = new Subscription();

  constructor() {}

  ngOnInit() {
    this._subscriptions.add(
      this.control.valueChanges
        .pipe(filter(value => value instanceof Date && isValid(value)))
        .subscribe(value => this._hiddenControl.setValue(value, {emitEvent: false}))
    );

    this._subscriptions.add(
      this._hiddenControl.valueChanges
        .pipe(filter(value => value instanceof Date && isValid(value)))
        .subscribe(value => this.control.setValue(value, {emitEvent: false}))
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe()
  }
}
