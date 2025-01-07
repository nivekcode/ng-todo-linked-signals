import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

import {Todo} from './todos.service';

@Component({
  selector: 'todo-item',
  template: `
    <div class="todo-item" (click)="deleteTodo.emit(todo().id)">
      {{ todo().title }}
      <span class="material-symbols-outlined">delete</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  deleteTodo = output<string>();
}
