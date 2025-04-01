import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BookStore} from './store/books.store';
import {TodosComponent} from './pages/todos/todos.component';
import {TodosStore} from './store/todos.store';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // providers: [BookStore]
      },
      {
        path:'todos',
        component:TodosComponent,
        providers:[TodosStore]
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  // Add a wildcard route for any unmatched URLs
  {
    path: '**',
    redirectTo: ''
  }
];
