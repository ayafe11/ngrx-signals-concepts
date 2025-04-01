import {computed} from '@angular/core';
import {signalStore,withMethods,patchState} from '@ngrx/signals';
import {
  addEntity,
  removeEntities, removeEntity,
  updateAllEntities, withEntities
} from '@ngrx/signals/entities';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const TodosStore = signalStore(
  withEntities<Todo>(),
  withMethods((store) => ({
    addTodo(todo: Todo): void {
      patchState(store, addEntity(todo));
    },
    removeTodo(id:number):void{
      patchState(store,removeEntity(id))
    },
    removeEmptyTodos(): void {
      patchState(store, removeEntities(({ text }) => !text));
    },
    completeAllTodos(): void {
      patchState(store, updateAllEntities({ completed: true }));
    },
  }))
);
