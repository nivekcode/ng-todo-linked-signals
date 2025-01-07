import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo-editor',
    loadComponent: () => import('./todos/todos-editor.component').then(m => m.TodosEditorComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo-editor'
  }
];
