import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const BE_URL = 'http://localhost:3000';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  #httpClient = inject(HttpClient);

  getTodos() {
    return this.#httpClient.get<Todo[]>(`${BE_URL}/todos`);
  }

  addTodo(value: string) {
    return this.#httpClient.post<Todo>(`${BE_URL}/todos`, {
      title: value,
      done: false
    });
  }

  deleteTodo(id: string) {
    return this.#httpClient.delete(`${BE_URL}/todos/${id}`);
  }

}
