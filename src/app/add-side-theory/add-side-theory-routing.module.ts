import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSideTheoryPage } from './add-side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: AddSideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSideTheoryPageRoutingModule {}
