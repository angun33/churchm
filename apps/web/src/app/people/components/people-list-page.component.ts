import {HttpParams} from "@angular/common/http";
import {Component, Inject, OnInit} from '@angular/core';
import {PaginationResponse, PaginatorPlugin} from "@datorama/akita";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {PeoplePageMenus} from "../people.menus";
import {PeopleService} from "../services/people.service";
import {PeopleState} from "../states/people.store";


@Component({
  selector: 'people-list-page',
  templateUrl: 'people-list-page.component.html',
  styleUrls: ['people-list-page.component.scss'],
})
export class PeopleListPageComponent implements OnInit {
  public menus = PeoplePageMenus;
  public columns = ['firstName', 'lastName', 'email', 'mobileNo', 'classification', 'actions'];
  public pagination$: Observable<PaginationResponse<PeopleState>>;

  private confirmDelete = null;

  constructor(
    @Inject('PEOPLE_PAGINATOR')
    public paginatorRef: PaginatorPlugin<PeopleState>,
    private service:PeopleService
  ) {}

  ngOnInit() {
    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      switchMap(( page ) => {
        const params = (new HttpParams())
          .set('page', page)
          .set('per_page', 50);
        const mapResponseFn = (person) => ({
          ...person,
          dob: new Date(person.dob),
          createdAt: new Date(person.createdAt),
          updatedAt: new Date(person.updatedAt)
        });

        const reqFn = () => this.service.get({params, mapResponseFn}).pipe(
          map((response:any) => ({
            perPage: 50,
            lastPage: response.pageCount,
            currentPage: response.page,
            total: response.total,
            data: response.data
          }))
        );

        return this.paginatorRef.getPage(reqFn);
      })
    );
    this.paginatorRef.refreshCurrentPage();
  }

  ngOnDestroy() {
    this.paginatorRef.destroy();
  }

  log(event) {
    console.log(event)
    this.paginatorRef.setPage(event.pageIndex - 1);
  }

  delete(person) {
    this.confirmDelete = person;
  }

  confirm() {
    if (this.confirmDelete !== null) {
      this.service.delete(this.confirmDelete.id)
        .subscribe(() => this.paginatorRef.refreshCurrentPage());
      this.confirmDelete = null;
    }
  }

  clearConfirm() {
    this.confirmDelete = null;
  }
}
