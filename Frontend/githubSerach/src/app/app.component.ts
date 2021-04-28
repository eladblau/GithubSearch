import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading: boolean = false;

  navLinks = [
    { link: 'search', label: 'Serach' },
    { link: 'favorites', label: 'Favorites' }
  ];

  constructor(private apiService: ApiService) {
    this.apiService.getLoading().subscribe(val => {
      this.loading = val;
    })
  }

}
