import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {Classification, ClassificationsStore} from "../services/classifications.store";

@Injectable()
export class ClassificationsPagePresenter {
  public form:FormGroup;

  private _save:BehaviorSubject<Classification> = new BehaviorSubject(null)
  public readonly save$:Observable<Classification> = this._save.asObservable();

  constructor(private store:ClassificationsStore, private fb:FormBuilder) {
    this.form = fb.group({
      id: '',
      name: ['', Validators.required]
    })
  }

  edit(data) {
    this.form.reset(data);
    this.form.markAsPristine();
    this.store.update({mode: 'edit'})
  }

  showForm() {
    this.resetForm();
  }

  resetForm() {
    this.form.reset({});
    this.form.markAsPristine();
    this.store.update({mode: 'new'});
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._save.next(this.form.getRawValue());
    this.resetForm();
  }
}
