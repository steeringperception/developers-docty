import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiViewerComponent } from '@app/commons/api-viewer/api-viewer.component';
import { DocumentorFormComponent } from '@app/commons/documentor-form/documentor-form.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'preview/:apiId', component: ApiViewerComponent },
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
