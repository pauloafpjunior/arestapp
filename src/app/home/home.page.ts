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

  constructor(private _taskService: TaskService) {
  }

  ionViewDidEnter() {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this._taskService.getAll();
  }

}
