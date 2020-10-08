import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubSideTheoryPage } from './sub-side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: SubSideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubSideTheoryPageRoutingModule {}
