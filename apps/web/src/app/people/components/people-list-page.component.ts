import {Component, OnInit} from '@angular/core';
import {PeoplePageMenus} from "../people.menus";
import {PeopleListPagePresenter} from "./people-list-page.presenter";


@Component({
  selector: 'people-list-page',
  templateUrl: 'people-list-page.component.html',
  viewProviders: [PeopleListPagePresenter]
})
export class PeopleListPageComponent implements OnInit {
  public menus = PeoplePageMenus;

  constructor(
    public presenter:PeopleListPagePresenter
  ) {}

  ngOnInit() {
    this.presenter.paginator.refreshCurrentPage();
  }

  ngOnDestroy() {
    this.presenter.paginator.destroy();
  }

  page(event) {
    this.presenter.paginator.setPage(event.pageIndex - 1);
  }
}
