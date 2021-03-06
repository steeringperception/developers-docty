import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiViewerComponent } from '@app/commons/api-viewer/api-viewer.component';
import { DocsViewerComponent } from '@app/commons/docs-viewer/docs-viewer.component';
import { DocsComponent } from '@app/commons/docs/docs.component';
import { DocumentorFormComponent } from '@app/commons/documentor-form/documentor-form.component';
import { AuthGuard } from '@app/services/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      // { path: 'prologue', component: DocsComponent },
      ...[
        { route: 'prologue', code: 'api_docs_prologue' },
        { route: 'authentication', code: 'api_docs_authentication' }]
        .map(path => ({
          path: path.route,
          component: DocsComponent,
          data: { name: path.route, code: path.code }
        })),
      ...[
        { route: 'prologue', code: 'api_docs_prologue' },
        { route: 'authentication', code: 'api_docs_authentication' }]
        .map(path => ({
          path: `${path.route}/preview`,
          data: { name: path.route, code: path.code },
          component: DocsViewerComponent
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
