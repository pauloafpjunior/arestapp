import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
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

  constructor(
    private _taskService: TaskService,
    private _actionSheetCtrl: ActionSheetController) {
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

  async showMenu(task: Task) {
    const actionSheet = await this._actionSheetCtrl.create({
      header: 'Menu',
      buttons: [
        {
          icon: 'create-outline',
          text: 'Editar'
        },
        {
          icon: 'calendar-number-outline',
          text: 'Agendar'
        },
        {
          icon: 'trash-outline',
          text: 'Remover'
        },

      ]
    });

    await actionSheet.present();
  }

}
