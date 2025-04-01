import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService{
  http = inject(HttpClient)
  loadBooks(){
   return this.http.get('https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books')
  }
}
