import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  {
    path: 'documentor',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'setup', component: SetupComponent },
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
