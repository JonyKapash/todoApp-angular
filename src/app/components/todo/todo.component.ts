import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  displayTodos: any[] = [];
  hideCompletedTodos: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.firestoreCollection
      .valueChanges({ idField: 'id' })
      .subscribe((item) => {
        this.todos = item.sort((a: any, b: any) => a.isDone - b.isDone);
        this.setDisplayTodos();
      });
  }

  onAdd(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = '';
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }

  onDelete(id: string) {
    this.todoService.deleteTodoById(id);
  }

  getTodoCount() {
    return this.todos.length;
  }

  toggleHideCompletedTodos() {
    this.hideCompletedTodos = !this.hideCompletedTodos;
    this.setDisplayTodos();
  }

  setDisplayTodos() {
    this.displayTodos = this.hideCompletedTodos
      ? this.todos.filter((todo) => !todo.isDone)
      : this.todos;
  }
}
