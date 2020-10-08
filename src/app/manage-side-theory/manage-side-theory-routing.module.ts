import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSideTheoryPage } from './manage-side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSideTheoryPageRoutingModule {}
