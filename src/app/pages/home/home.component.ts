import {Component, inject} from '@angular/core';
import {BookStore} from '../../store/books.store';
import {JsonPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
   providers:[BookStore] // could be provided for specific component

})
export class HomeComponent {
  bookStore = inject(BookStore);

  // change Books(){
  //   // ⚠️This is not the recommended pattern
  //   // ⚠️ The state of the `BooksStore` is unprotected from external modifications.
  //   // set {protectedState:false} for the store,
  //   patchState(this.bookStore,(state)=>({...state,books:['aya']}))
  // }

}
