import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

export abstract class FormHelperService {
  public form:FormGroup;

  get values() {
    return this.form.getRawValue();
  }

  get errors() {
    return this.form.errors
  }

  load(data, opts?) {
    this.form.reset(data, opts)
  }

  get(path: Array<string | number> | string): AbstractControl | null {
    return this.form.get(path)
  }

  value(path: Array<string | number> | string) {
    return this.get(path).value
  }

  reset(opts?) {
    this.form.reset(undefined, opts);
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  public iterateAllControls(callback:((FormControl) => void)) {
    this._iterateAllControls(this.form, callback);
  }

  private _iterateAllControls(controls:AbstractControl|FormGroup|FormArray|FormControl, callback:((AbstractControl) => void)) {
    if (controls instanceof FormGroup) {
      callback(controls);
      Object.entries(controls.controls)
        .forEach(([name, control]) =>{
          this._iterateAllControls(control, callback)
        })
    }
    else if (controls instanceof FormArray) {
      callback(controls);
      for (let i = 0; i < controls.controls.length; i++) {
        this._iterateAllControls(controls[i], callback);
      }
    }
    else if (controls instanceof FormControl || controls instanceof AbstractControl) {
      callback(controls);
    }
  }
}
