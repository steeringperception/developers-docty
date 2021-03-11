import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiViewerComponent } from '@app/commons/api-viewer/api-viewer.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: ':apiId', component: ApiViewerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
