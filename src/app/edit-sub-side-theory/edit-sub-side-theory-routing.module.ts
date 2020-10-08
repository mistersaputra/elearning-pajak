import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubSideTheoryPage } from './edit-sub-side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: EditSubSideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubSideTheoryPageRoutingModule {}
