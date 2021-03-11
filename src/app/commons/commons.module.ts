import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DocumentorFormComponent } from './documentor-form/documentor-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CKEditorModule } from 'ckeditor4-angular';
import { ApiViewerComponent } from './api-viewer/api-viewer.component';
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DocsComponent } from './docs/docs.component';
import { DocsViewerComponent } from './docs-viewer/docs-viewer.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [DocumentorFormComponent, ApiViewerComponent, DocsComponent, DocsViewerComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatChipsModule,
    CKEditorModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgxJsonViewerModule,
    RouterModule,
    ClipboardModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  exports: [DocumentorFormComponent, ApiViewerComponent]
})
export class CommonsModule { }
