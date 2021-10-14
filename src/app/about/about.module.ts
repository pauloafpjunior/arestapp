import { NgModule } from '@angular/core';

import { AboutPage } from './about.page';
import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AboutPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [AboutPage],
})
export class AboutPageModule {}
