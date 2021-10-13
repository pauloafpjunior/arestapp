import { Component } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: Task[] = [
    { id: 1, name: 'Fazer compras', deadline: null, isDone: false },
    { id: 2, name: 'Estudar para a prova de ES', deadline: new Date(), isDone: true },
  ];

  constructor() {}

}
