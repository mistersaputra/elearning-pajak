import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'manage-side-theory',
    loadChildren: () => import('./manage-side-theory/manage-side-theory.module').then( m => m.ManageSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-side-theory',
    loadChildren: () => import('./add-side-theory/add-side-theory.module').then( m => m.AddSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-sub-side-theory',
    loadChildren: () => import('./add-sub-side-theory/add-sub-side-theory.module').then( m => m.AddSubSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'manage-sub-side-theory',
    loadChildren: () => import('./manage-sub-side-theory/manage-sub-side-theory.module').then( m => m.ManageSubSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-sub-side-theory',
    loadChildren: () => import('./edit-sub-side-theory/edit-sub-side-theory.module').then( m => m.EditSubSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-side-theory',
    loadChildren: () => import('./edit-side-theory/edit-side-theory.module').then( m => m.EditSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'side-theory',
    loadChildren: () => import('./side-theory/side-theory.module').then( m => m.SideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'sub-side-theory',
    loadChildren: () => import('./sub-side-theory/sub-side-theory.module').then( m => m.SubSideTheoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'sub-side-theory-details',
    loadChildren: () => import('./sub-side-theory-details/sub-side-theory-details.module').then( m => m.SubSideTheoryDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'register-avatar',
    loadChildren: () => import('./register-avatar/register-avatar.module').then( m => m.RegisterAvatarPageModule)
  },
  {
    path: 'manage-articles',
    loadChildren: () => import('./manage-articles/manage-articles.module').then( m => m.ManageArticlesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-articles',
    loadChildren: () => import('./add-articles/add-articles.module').then( m => m.AddArticlesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'paper-work',
    loadChildren: () => import('./paper-work/paper-work.module').then( m => m.PaperWorkPageModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
