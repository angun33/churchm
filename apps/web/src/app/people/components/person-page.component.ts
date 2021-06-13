import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";
import {PeoplePageMenus} from "../people.menus";
import {PeopleService} from "../services/people.service";
import {PeopleQuery} from "../states/people.query";
import {PeopleStore} from "../states/people.store";

@Component({
  selector: 'person-page',
  templateUrl: 'person-page.component.html'
})
export class PersonPageComponent implements OnInit, OnDestroy {
  public menus = PeoplePageMenus;
  public person$:Observable<any> = this.query.selectActive();

  private subscriptions:Subscription = new Subscription();

  constructor(
    private query:PeopleQuery,
    private service:PeopleService,
    private store:PeopleStore,
    private route:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.params
        .pipe(
          filter(param => param.id),
          map(param => param.id),
          switchMap(id => this.service.getOne(id))
        )
        .subscribe(
          (person:any) => this.store.setActive(person.id),
          () => this.router.navigate(['/people'])
        )
    )
  }

  ngOnDestroy() {
    this.store.setActive(null);
  }
}
