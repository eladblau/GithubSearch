import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loading = new BehaviorSubject<boolean>(false);
  private loading$ = this.loading.asObservable();


  constructor(private http: HttpClient) { }

  public getLoading(): Observable<boolean> {
    return this.loading$;
  }

  public setLoading(val: boolean) {
    this.loading.next(val);
  }

  public searchRepositories(value: any) {
    if (!value) return of([]);
    let params = {
      searchedVal: value
    };
    return this.http.get<any>('api/Search', { params: params });
  }


  public getFavorites(username: any) {

    let params = {
      username: username || ''
    };
    return this.http.get<any[]>('api/favorites', { params: params });
  }

  public getFavoritesRepositories(username: any) {
    let params = {
      username: username || ''
    };
    return this.http.get<any[]>('api/favorites/GetFavoriteRepositories', { params: params });
  }

  public addToFavorites(repoId: any, username: any) {
    if (!repoId) return of(false);

    let params = {
      repoId: repoId,
      username: username || ''
    };
    return this.http.get<any>('api/favorites/Add', { params: params });
  }


  public deleteFromFavorites(repoId: any, username: any) {
    if (!repoId) return of(false);

    let params = {
      repoId: repoId,
      username: username || ''
    };
    return this.http.get<any>('api/favorites/Delete', { params: params });
  }

}
