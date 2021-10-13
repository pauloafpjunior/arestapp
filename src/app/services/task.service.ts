import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Task[] = [
    { id: 1, name: 'Comprar pão', deadline: null, isDone: false },
    { id: 2, name: 'Estudar para a prova de ES', deadline: new Date(), isDone: true },
  ];

  constructor() { }

  async getAll(): Promise<Task[]> {
    return [...this._tasks];
  }
}
