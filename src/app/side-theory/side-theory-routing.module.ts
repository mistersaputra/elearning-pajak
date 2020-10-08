import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideTheoryPage } from './side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: SideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideTheoryPageRoutingModule {}
