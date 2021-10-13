import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
    private _actionSheetCtrl: ActionSheetController,
    private _alertCtrl: AlertController
  ) {}

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
      isDone: false,
    };

    await this._taskService.add(task);
    this.taskName = '';
    this.loadTasks();
  }

  async editTaskName(task: Task): Promise<void> {
    const alertInput = await this._alertCtrl.create({
      header: 'Editar tarefa',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          value: task.name,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: async (data) => {
            if (!data.taskName || data.taskName.trim().length === 0) {
              return;
            }

            task.name = data.taskName;
            await this._taskService.update(task);
            this.loadTasks();
          },
        },
      ],
    });
    await alertInput.present();
  }

  async agendarTarefa(task: Task): Promise<void> {
    const alertInput = await this._alertCtrl.create({
      header: 'Agendar tarefa',
      inputs: [
        {
          name: 'deadline',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: async (data) => {
            task.deadline = data.deadline;
            await this._taskService.update(task);
            this.loadTasks();
          },
        },
      ],
    });
    await alertInput.present();
  }

  async removeTask(task: Task): Promise<void> {
    await this._taskService.remove(task.id);
    this.loadTasks();
  }

  async showMenu(task: Task) {
    const actionSheet = await this._actionSheetCtrl.create({
      header: 'Menu',
      buttons: [
        {
          icon: 'create-outline',
          text: 'Editar',
          handler: () => this.editTaskName(task),
        },
        {
          icon: 'calendar-number-outline',
          text: 'Agendar',
          handler: () => this.agendarTarefa(task)
        },
        {
          icon: 'trash-outline',
          text: 'Remover',
          handler: () => this.removeTask(task),
        },
      ],
    });

    await actionSheet.present();
  }
}
