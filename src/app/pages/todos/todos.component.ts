import {Component, effect, inject, Injector, OnInit} from '@angular/core';
import {TodosStore} from '../../store/todos.store';
import {FormsModule} from '@angular/forms';
import {patchState, signalMethod, signalState} from '@ngrx/signals';

@Component({
  selector: 'app-todos',
  imports: [FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',

})
export class TodosComponent implements OnInit{
  injector = inject(Injector);
  todosStore = inject(TodosStore);
  todo = '';
  readonly state = signalState({ isOpen: false });

  constructor() {
    effect(()=>{
      console.log("called from effect to track state toggling for ui changes for example", this.state());
      // Add your logic here...
    })
  }
  //example of signalMethod (defined inside injection context)
  logState = signalMethod<boolean>(
    (state) => {
      console.log("called from signalMethod",state)
      // could update another signal state ...
    }
  );
  ngOnInit() {
    //example of signalMethod if called (defined out of injection context)
  const logDoubledNumber = signalMethod<number>(
      (num) => console.log(num * 2),
      { injector: this.injector },
    );
    logDoubledNumber(2)
  }
  addToDo(text: string) {
    //example of signalState
    patchState(this.state,(s => ({ isOpen: !s.isOpen })));
    //example of signalMethod reactivity whenever signal changes
    this.logState(this.state.isOpen());
    if (text) {
      this.todosStore.addTodo({
        id: Date.now(),
        text,
        completed: false
      })
      this.todo='';
    }
  }
}
