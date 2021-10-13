import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: Task[] = [
    { id: 1, name: 'Comprar pão', deadline: null, isDone: false },
    {
      id: 2,
      name: 'Estudar para a prova de ES',
      deadline: new Date(),
      isDone: true,
    },
  ];

  constructor() {}

  async getAll(): Promise<Task[]> {
    return [...this._tasks];
  }

  async add(task: Task): Promise<void> {
    task.id = Date.now();
    this._tasks.push(task);
  }

  async update(task: Task): Promise<void> {
    if (!task.id) {
      return;
    }

    const index = this._tasks.findIndex((item) => item.id === task.id);

    if (index >= 0) {
      this._tasks[index] = task;
    }
  }
}
