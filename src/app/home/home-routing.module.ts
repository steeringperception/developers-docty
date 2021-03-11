import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiViewerComponent } from '@app/commons/api-viewer/api-viewer.component';
import { DocsViewerComponent } from '@app/commons/docs-viewer/docs-viewer.component';
import { DocsComponent } from '@app/commons/docs/docs.component';
import { DocumentorFormComponent } from '@app/commons/documentor-form/documentor-form.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      // { path: 'prologue', component: DocsComponent },
      ...[
        { route: 'prologue', code: 'api_docs_prologue' },
        { route: 'authentication', code: 'api_docs_authentication' }]
        .map(path => ({
          path: path.route,
          component: DocsComponent,
          data: { pageName: path.route, code: path.code }
        })),
      ...[
        { route: 'prologue', code: 'api_docs_prologue' },
        { route: 'authentication', code: 'api_docs_authentication' }]
        .map(path => ({
          path: `/preview/${path.route}`,
          component: DocsComponent,
          data: { pageName: path.route, code: path.code }
        })),
      // { path: 'prologue/preview', component: DocsViewerComponent },
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
