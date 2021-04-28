import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  username = '';

  searchInputFormControl = new FormControl();
  reposList: any[] = [];
  favorites: any[] = [];
  loadingResults: boolean = false;
  dataObs: any;
  subFav: any;
  subAllFav: any;

  constructor(private apiService: ApiService,
    private _snackBar: MatSnackBar) {

    this.subAllFav = this.apiService.getFavorites(this.username).subscribe(data => {
      this.favorites = data;
      if (this.reposList.length && this.favorites.length) {
        this.addFavoritePropToRepos();
      }
    });

  }

  ngOnDestroy(): void {
    this.subFav?.unsubscribe();
    this.subAllFav?.unsubscribe();
  }


  ngOnInit(): void {

    this.dataObs = this.searchInputFormControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap((value) => {
          if (value?.length > 2) {
            return this.searchRepositories(value);
          }
          else {
            return of(null);
          }
        })
      ).subscribe(res => res);
  }

  private searchRepositories(value: any) {
    this.apiService.setLoading(true);
    return this.apiService.searchRepositories(value)
      .pipe(
        map(data => {
          this.apiService.setLoading(false);

          this.reposList = data?.items;

          if (this.favorites.length) {
            this.addFavoritePropToRepos();
          }
          console.log(data);
          return data;
        })
      );
  }


  private addFavoritePropToRepos() {
    this.favorites.forEach(f => {
      let ind = this.reposList.findIndex(x => x.id == f.repoId);
      if (ind > -1) {
        this.reposList[ind].favorite = true;
      }
    });
  }


  addToFavorite(event: any) {
    this.apiService.setLoading(true);
    this.subFav = this.apiService.addToFavorites(event?.id, this.username).subscribe(res => {
      this.apiService.setLoading(false);
      if (res?.success) {
        let ind = this.reposList.findIndex(x => x.id == event?.id);
        if (ind > -1) {
          this.reposList[ind].favorite = true;
        }
        this.showSnackBar('The reopsitory was added to favorites');
      }
    });
  }


  deleteFromFavorites(event: any) {

    this.apiService.setLoading(true);
    this.subFav = this.apiService.deleteFromFavorites(event?.id, this.username).subscribe(res => {
      this.apiService.setLoading(false);
      if (res?.success) {
        let ind = this.reposList.findIndex(x => x.id == event?.id);
        if (ind > -1) {
          this.reposList[ind].favorite = false;
        }
        this.showSnackBar('The reopsitory was deleted from favorites');
      }
    });

  }


  private showSnackBar(message: string) {
    let conf = new MatSnackBarConfig();
    conf.duration = 3000;
    conf.horizontalPosition = 'center';
    conf.verticalPosition = 'bottom';
    conf.panelClass = 'snack-bar-center';

    this._snackBar.open(message);
  }

  clearInput(event: any) {
    this.searchInputFormControl.reset();
  }


}
