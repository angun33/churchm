import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {isValid} from "date-fns";
import {isEmptyString} from "../../utils/checks.utils";
import {FormHelperService} from "../../utils/form-helper.service";

function validDate(c: FormControl) {
  return isEmptyString(c.value) || (c.value instanceof Date && isValid(c.value)) ? null : {date: {valid: false}};
}

@Injectable()
export class PeopleFormService extends FormHelperService {
  public form:FormGroup;

  constructor(private fb:FormBuilder) {
    super();
    this.build();
  }

  build() {
    this.form = this.fb.group({
      title: '',
      firstName: ['', Validators.required],
      middleName: '',
      lastName: '',
      dob: ['', validDate],
      gender: ['', Validators.required],
      contactDetails: this.fb.group({
        email: ['', Validators.email],
        mobileNo: '',
        homeNo: '',
        workNo: ''
      }),
      classification: null
    })
  }
}
