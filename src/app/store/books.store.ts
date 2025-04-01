import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
  withProps,
  getState, deepComputed
} from '@ngrx/signals';
import {computed, effect, inject, InjectionToken} from '@angular/core';
import {BookService} from '../services/book.services';
import {interval, map, pipe, switchMap, tap} from 'rxjs';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {withLogger} from './logger.feature';


type Order = 'asc' | 'desc';

type BookState = {
  books: string[],
  filter: { query: string, order: Order }
}

const initialState: BookState = {
  books: ['a book1', 'z book2'],
  filter: {query: 'Science', order: 'asc'}
}
// The initial state factory is executed within the injection
// context, allowing initial state to be obtained from a service or injection token.

const BOOKS_STATE = new InjectionToken<BookState>(
  'BooksState', {
    factory: () => initialState
  });


// export const BookStore = signalStore(
//   withState(()=> inject(BOOKS_STATE))
// )

//or

export const BookStore = signalStore(
  // {providedIn:'root'},  // 👇 Providing `BooksStore` at the root level.
  // {protectedState: false},
  withDevtools('library'),
  withState(initialState),
  withLogger('books'),
  withProps(() => ({
    sharedProp: '123'
  })),
  withComputed(({books, filter, sharedProp}) => {
      return {
        booksCount: computed(() => books().length),
        sortedBooks: computed(() => {
          console.log("sharedProp from withComputed", sharedProp)
          return books().sort((a, b) => a.localeCompare(b) * (filter.order() === 'asc' ? 1 : -1));
        }),
        pagination: deepComputed(() => ({
          currentPage: 1,
          pageSize: 10,
          totalPages:  books().length/10,
        })),
      }
    }
  ),
  withMethods((store, bookService = inject(BookService)) => ({
    loadBooks: rxMethod<void>(
      pipe(
        switchMap(() => {
            return bookService.loadBooks().pipe(
              map((res: any) => res.map((book: any) => book.title)),
              tapResponse({
                next: (res: string[]) => {
                  console.log(res)
                  patchState(store, {books: res})
                },
                error: (err) => {
                  console.log(err)
                },
                complete: () => {
                  console.log("completed")
                }
              })
            )
          }
        )
      )),
    sort: () => {
      console.log("sharedProp from withMethods", store.sharedProp)
      const newOrder: Order = store.filter().order === 'asc' ? 'desc' : 'asc';
      patchState(store, (state) => ({
        filter: {...state.filter, order: newOrder}
      }))
    }
  })),
  withHooks({
    onInit(store) {
      //   interval(1000)
      //     .pipe(
      //       takeUntilDestroyed()
      //     ).subscribe(console.log)
      console.log("store is initialized")
      // effect(()=>{    // 👇 The effect is re-executed on state change.
      console.log("current state values in store", getState(store))
      //})
    },
    onDestroy() {
      console.log("store is destroyed");
    }
  })
)
