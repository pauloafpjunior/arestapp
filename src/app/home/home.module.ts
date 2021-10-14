import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [HomePage],
})
export class HomePageModule {}
