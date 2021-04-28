import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss']
})
export class ReposListComponent implements OnInit {

  @Input("reposList") reposList: any[] = [];
  @Output("addToFavoriteClicked") addToFavoriteEvent: EventEmitter<any> = new EventEmitter();
  @Output("removeFromFavoritesClicked") removeFromFavorites: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  addToFavorite(event: any, repo: any) {
    event?.stopPropagation();
    this.addToFavoriteEvent.emit(repo);
  }


  removeFromFavoritesClicked(event: any, repo: any) {
    event?.stopPropagation();
    this.removeFromFavorites.emit(repo);
  }

}
