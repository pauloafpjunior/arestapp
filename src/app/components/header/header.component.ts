import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<ion-item class="header" color="primary" lines="none">
    <ion-label class="header-title">{{ title }}</ion-label>
  </ion-item>`,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = 'Tarefas';
}
