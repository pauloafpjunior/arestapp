import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonInput,
} from '@ionic/angular';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('autofocus', { static: false }) inputTask: IonInput;

  tasks: Task[] = [];
  taskName: string = '';

  constructor(
    private _taskService: TaskService,
    private _actionSheetCtrl: ActionSheetController,
    private _alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  setFocus() {
    setTimeout(() => {
      this.inputTask.setFocus();
    }, 300);
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this._taskService.getAll();
  }

  async addTask(): Promise<void> {
    const task: Task = {
      name: this.taskName,
      isDone: false,
    };

    await this._taskService.add(task);
    this.taskName = '';
    this.loadTasks();
    this.setFocus();
  }

  async toggleTask(task: Task): Promise<void> {
    task.isDone = !task.isDone;
    await this._taskService.update(task);
    this.loadTasks();
  }

  async editTaskName(task: Task): Promise<void> {
    const alertInput = await this._alertCtrl.create({
      header: 'Edit task',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          value: task.name,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: async (data) => {
            const updatedTask = { ...task, name: data.taskName };
            await this._taskService.update(updatedTask);
            this.loadTasks();
          },
        },
      ],
    });
    await alertInput.present();
  }

  async scheduleTask(task: Task): Promise<void> {
    const alertInput = await this._alertCtrl.create({
      header: 'Schedule task',
      inputs: [
        {
          name: 'deadline',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: async (data) => {
            const updatedTask = { ...task, deadline: data.deadline };
            await this._taskService.update(updatedTask);
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
          text: 'Edit',
          handler: () => this.editTaskName(task),
        },
        {
          icon: 'calendar-number-outline',
          text: 'Schedule',
          handler: () => this.scheduleTask(task),
        },
        {
          icon: 'trash-outline',
          text: 'Remove',
          handler: () => this.removeTask(task),
        },
      ],
    });

    await actionSheet.present();
  }

  get today(): Date {
    return new Date();
  }
}
