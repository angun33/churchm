import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {PeoplePageMenus} from "../../people.menus";
import {ClassificationsQuery} from "../services/classifications.query";
import {Classification, ClassificationsStore} from "../services/classifications.store";
import {ClassificationsPagePresenter} from "./classifications-page.presenter";
import {ClassificationsService} from "../services/classifications.service";

@Component({
  selector: 'classifications-page',
  templateUrl: 'classifications-page.component.html',
  viewProviders: [ClassificationsPagePresenter]
})
export class ClassificationsPageComponent implements OnInit {
  public menus = PeoplePageMenus;
  public mode$ = this.query.select('mode');
  public classifications$:Observable<Classification[]> = this.query.selectAll();

  private subscriptions = new Subscription();

  constructor(
    private store:ClassificationsStore,
    private service:ClassificationsService,
    private query:ClassificationsQuery,
    public presenter:ClassificationsPagePresenter
  ) {}

  ngOnInit() {
    // Load all the classifications
    this.service.get().subscribe();

    this.subscriptions.add(
      this.presenter.save$
        .pipe(filter(data => data !== null))
        .subscribe(data => this.save(data))
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  drop(event:CdkDragDrop<Classification>) {
    let data = this.query.getAll();

    // Re order the list
    moveItemInArray(data, event.previousIndex, event.currentIndex);

    // Set it back to the state store and update it to the backend
    this.store.set(
      data.map((item:any, index) => {
        const copy = {...item};
        if (item.order !== index) {
          copy.order = index;
          this.service.update(item.id, copy).subscribe()
        }
        return copy;
      })
    );
  }

  delete(classification) {
    this.service.delete(classification.id).subscribe();
  }

  save(values) {
    if (this.query.getValue().mode === 'new') {
      this.service.add({
        name: values.name,
        order: this.query.getCount()
      }).subscribe()
    }
    else {
      this.service.update(values.id, values).subscribe()
    }
  }
}
