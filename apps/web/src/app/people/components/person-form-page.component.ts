import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";
import {isNotNullAndUndefined} from "../../utils/checks.utils";
import {ClassificationsQuery} from "../classifications/services/classifications.query";
import {ClassificationsService} from "../classifications/services/classifications.service";
import {Classification} from "../classifications/services/classifications.store";
import {PeoplePageMenus} from "../people.menus";
import {PeopleFormService} from "../services/people-form.service";
import {PeopleService} from "../services/people.service";
import {PeopleQuery} from "../states/people.query";
import {PeopleStore} from "../states/people.store";

@Component({
  selector: 'person-form-page',
  templateUrl: 'person-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ PeopleFormService ]
})
export class PersonFormPageComponent implements OnInit, OnDestroy {
  public menus = PeoplePageMenus;
  public classifications$:Observable<Classification[]> = this.classificationQuery.selectAll();
  public isEditMode$:Observable<boolean> = this.query.selectActiveId().pipe(map(isNotNullAndUndefined))
  private subscriptions:Subscription = new Subscription();

  constructor(public formService:PeopleFormService,
              private store:PeopleStore,
              private query:PeopleQuery,
              private service:PeopleService,
              private classificationQuery: ClassificationsQuery,
              private classificationService: ClassificationsService,
              private snackBar:MatSnackBar,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    this.formService.reset();
    this.classificationService.get().subscribe();
    this.subscriptions.add(
      this.route.params
        .pipe(
          filter(param => param.id),
          map(param => param.id),
          switchMap(id => this.service.getOne(id))
        )
        .subscribe(
          (person:any) => this.store.setActive(person.id),
          () => this.router.navigate(['/people/new'])
        )
    );

    this.subscriptions.add(
      this.query.selectActive()
        .subscribe(person => this.formService.load(person))
    );
  }

  ngOnDestroy() {
    this.store.setActive(null);
    this.subscriptions.unsubscribe();
  }

  submit() {
    if (this.formService.form.status === 'INVALID') {
      this.formService.markAllAsTouched();
      return;
    }

    const id = this.query.getActiveId();
    if (id) {
      this.service.update(id, this.formService.values)
        .subscribe(() => {
          this._notifyAndClear();
          this.router.navigate(['/people/new'])
        })
    } else {
      this.service.add(this.formService.values)
        .subscribe(() => this._notifyAndClear())
    }
  }

  _notifyAndClear() {
    this.formService.reset();

    this.snackBar.open("Saved", undefined, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 1000
    });
  }

  classificationCompare(o1, o2) {
    return o1.id === o2.id
  }
}
