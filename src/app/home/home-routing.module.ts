import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentorFormComponent } from '@app/commons/documentor-form/documentor-form.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: ':folderId', component: DocumentorFormComponent },
      { path: ':folderId/:apiId', component: DocumentorFormComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
