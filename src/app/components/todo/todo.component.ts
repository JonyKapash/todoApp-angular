import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../shared/todo.service';

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  displayTodos: Todo[] = [];
  thisPageTodos: Todo[] = [];
  hideCompletedTodos: boolean = false;
  pageSize: number = 10;
  indexFrom: number = 0;

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

    this.thisPageTodos = this.displayTodos.slice(
      this.indexFrom,
      this.indexFrom + this.pageSize
    );
  }

  onPrevPage() {
    this.indexFrom -= this.pageSize;
    this.setDisplayTodos();
  }

  onNextPage() {
    this.indexFrom += this.pageSize;
    this.setDisplayTodos();
  }

  getPrevPageDisabled() {
    return this.indexFrom === 0;
  }

  getNextPageDisabled() {
    return this.indexFrom + this.pageSize >= this.displayTodos.length;
  }

  changePageSize(newPageSize: string) {
    this.pageSize = Number(newPageSize);
    this.setDisplayTodos();
  }
}
