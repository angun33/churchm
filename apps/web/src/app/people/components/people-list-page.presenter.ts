import {HttpParams} from "@angular/common/http";
import {Inject, Injectable} from '@angular/core';
import {PaginationResponse, PaginatorPlugin} from "@datorama/akita";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {PeopleService} from "../services/people.service";
import {PeopleState} from "../states/people.store";

@Injectable()
export class PeopleListPagePresenter {
  public pagination$: Observable<PaginationResponse<PeopleState>> = this.paginator.pageChanges.pipe(
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

      return this.paginator.getPage(reqFn);
    }));

  constructor(
    @Inject('PEOPLE_PAGINATOR')
    public paginator: PaginatorPlugin<PeopleState>,
    private service:PeopleService
  ) {}

  deletePerson(person) {
    this.service.delete(person.id)
      .subscribe(() => this.paginator.refreshCurrentPage());
  }
}
