import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: Task[] = [];
  taskName: string = '';

  constructor(private _taskService: TaskService) {
  }

  ionViewDidEnter() {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this._taskService.getAll();
  }

  async addTask(): Promise<void> {
    if (!this.taskName || this.taskName.trim().length === 0) {
      return;
    }

    const task: Task = {
      name: this.taskName,
      isDone: false
    } 

    await this._taskService.add(task);
    this.taskName = '';
    this.loadTasks();
  }

}
