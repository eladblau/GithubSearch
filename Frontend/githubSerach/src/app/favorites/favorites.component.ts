import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  username = '';
  subFav: any;
  reposList: any[] = [];
  subRep: any;


  constructor(private apiService: ApiService,
    private _snackBar: MatSnackBar) {
    
      this.getFavoritesRepos();
  }

  ngOnDestroy(): void {
    this.subFav?.unsubscribe();
  }

  ngOnInit(): void {
  }

  private getFavoritesRepos() {
    this.apiService.setLoading(true);
    this.subRep = this.apiService.getFavoritesRepositories(this.username)
      .subscribe(data => {
        this.apiService.setLoading(false);

        this.reposList = data;
        this.reposList.forEach(f => f.favorite = true);
      })
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


}
