import {ChangeDetectionStrategy, Component, DestroyRef, inject, linkedSignal, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';

import {TodoItemComponent} from './todo-item.component';
import {TodosService} from './todos.service';

@Component({
  selector: 'todos-editor',
  template: `
    <div class="todo-editor">
      <input
        type="text"
        placeholder="What needs to be done?"
        [(ngModel)]="inputValue"
        (keydown.enter)="addTodo()"
      />
      @for (todo of todos(); track $index) {
        <todo-item (deleteTodo)="deleteTodo($event)" [todo]="todo"/>
      }

      <span class="made-with-heart">
        made with ❤️ by Nivek
      </span>

    </div>

  `,
  imports: [FormsModule, TodoItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosEditorComponent {
  #todoService = inject(TodosService);
  #destroyRef = inject(DestroyRef);

  inputValue = signal('');
  todos = linkedSignal(toSignal(this.#todoService.getTodos()));

  addTodo() {
    this.#todoService.addTodo(this.inputValue())
      .pipe(
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(freshlyAddedTodo => {
        this.todos.update(todos => todos ? [...todos, freshlyAddedTodo] : [freshlyAddedTodo])
      });
    this.inputValue.set('');
  }

  deleteTodo(id: string) {
    this.#todoService.deleteTodo(id)
      .pipe(
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(
        todo => this.todos.update(todos => todos!.filter(t => t.id !== id))
      );
  }
}
