import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubSideTheoryPage } from './add-sub-side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: AddSubSideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubSideTheoryPageRoutingModule {}
