import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiViewerComponent } from '@app/commons/api-viewer/api-viewer.component';
import { DocsViewerComponent } from '@app/commons/docs-viewer/docs-viewer.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', data: { code: 'api_docs_prologue' }, component: DocsViewerComponent },
      { path: 'authentication', data: { code: 'api_docs_authentication' }, component: DocsViewerComponent },
      { path: ':apiId', component: ApiViewerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
