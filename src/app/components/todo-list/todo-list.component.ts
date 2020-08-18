import { Component, OnInit } from '@angular/core';
// import { timer } from 'rxjs';
import { Todo } from '../../interface/todo';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(1000, style({ opacity: 1, transform: 'translateY(0px)' }))
      ]),

      transition(':leave', [

        animate(1000, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  todoTitle: string;
  idCounter: number;
  beforeTitle: string;
  date: Date;

  constructor() { }

  ngOnInit(): void {

    this.beforeTitle = '';
    this.idCounter = 2;
    this.todoTitle = '';
    this.date = new Date();


    console.log(this.date);


    this.todos = [

      {
        'id': 1,
        'title': "go home",
        'date': this.date,
        'completed': false,
        'editing': false

      }

    ]

  }

  addTodo(): void {

    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idCounter,
      title: this.todoTitle,
      date: this.date,
      completed: false,
      editing: false
    })

    this.todoTitle = '';
    this.idCounter++;

  }

  editTodo(todo: Todo): void {

    this.beforeTitle = todo.title;
    todo.editing = true;

  }

  doneEdit(todo: Todo): void {

    this.beforeTitle = todo.title;

    if (todo.title.trim().length === 0) {
      todo.title = this.beforeTitle;
    }

    if (this.beforeTitle != todo.title) {
      this.beforeTitle = todo.title;
    }

    todo.editing = false;

  }


  deleteItem(id: number): void {

    this.todos = this.todos.filter(todo => todo.id != id);

  }

  sortByName() {


    this.todos.sort((a, b) => a.title.localeCompare(b.title));



  }

  sortById() {
    this.todos.sort((a, b) => a.id - b.id);
  }


}


