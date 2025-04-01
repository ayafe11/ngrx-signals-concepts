import {Component, inject} from '@angular/core';
import {BookStore} from './store/books.store';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'ngrx-signals'

}
