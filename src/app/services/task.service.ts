import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY: string = 'MY-TASKS';
  private _tasks: Task[] = [];

  constructor(private _storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    await this._storage.create();
    this._tasks = (await this._storage.get(this.STORAGE_KEY)) || [];
  }

  async store(): Promise<void> {
    await this._storage.set(this.STORAGE_KEY, this._tasks);
  }

  async getAll(): Promise<Task[]> {
    return [...this._tasks];
  }

  async add(task: Task): Promise<void> {
    task.id = Date.now();
    this._tasks.push(task);
    await this.store();
  }

  async update(task: Task): Promise<void> {
    if (!task) {
      return;
    }

    const index = this._tasks.findIndex((item) => item.id === task.id);

    if (index >= 0) {
      this._tasks[index] = task;
      await this.store();
    }
  }

  async remove(taskId: number): Promise<void> {
    const index = this._tasks.findIndex((item) => item.id === taskId);

    if (index >= 0) {
      this._tasks.splice(index, 1);
      await this.store();
    }
  }
}
