import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@services/http.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CKEditor4 } from 'ckeditor4-angular';

import { data } from '../../../json/static';

interface queryParams {
  description: string | null;
  apiId: string | null;
  param: string | null;
  // id: string | null;
  representation: string;
  acceptableValues: string[];
}
interface params {
  type: string | null;
  param: string | null;
  apiId: string | null;
  // id: string | null;
  description: string | null;
  representation: string;
  acceptableValues: string[];
}
interface form {
  method: string | null;
  path: string | null;
  apiId: string | null;
  queryParams: queryParams[];
  params: params[];
  folderId: number | string | null;
  description: string | null;
}

@Component({
  selector: 'app-documentor-form',
  templateUrl: './documentor-form.component.html',
  styleUrls: ['./documentor-form.component.scss']
})
export class DocumentorFormComponent implements OnInit {

  type = CKEditor4.EditorType.INLINE;

  methodes: any[] = data.methods;
  representationTypes: string[] = data.representationTypes;
  form: form = {
    method: 'get',
    path: null,
    apiId: null,
    queryParams: [],
    params: [],
    folderId: null,
    description: null
  }

  showFieldSet: string = 'queryParams';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      if (res.apiId)
        this.getData(res.apiId)
    })
  }

  onMethodChange() {
    if (this.form.method == 'get' || this.form.method == 'delete') {
      this.showFieldSet = 'queryParams';
    } else {
      this.showFieldSet = 'params';
    }
  }

  getData(apiId: string) {
    this.http.get(`docs/get-collection/${apiId}`).toPromise().then((res: any) => {
      this.form = res;
      this.onMethodChange();
    })
  }

  addQueryParams() {
    this.form.queryParams.push({
      description: null, param: null,
      // id: null,
      apiId: null,
      acceptableValues: [],
      representation: 'text'

    })
  }
  removeQueryParams(i: number) {
    this.form.queryParams.splice(i, 1)
  }
  addParams() {
    this.form.params.push({
      description: null, param: null, type: null,
      // id: null,  
      apiId: null,
      acceptableValues: [],
      representation: 'text'
    })
  }
  removeParams(i: number) {
    this.form.params.splice(i, 1)
  }

  submitForm(form: NgForm) {
    if ((form.form.status || '').toLocaleLowerCase() == 'valid') {
      this.http.post(`documentor/api-doc`, this.form).toPromise().then((res: any) => {
        if (!!!this.form.apiId && res.appId) {
          this.router.navigate(['/', 'docs', res.appId]);
        } else {
          this.form = res;
        }
      })
    }

  }

  addChips(index: number, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (this.showFieldSet == 'params')
        this.form.params[index].acceptableValues.push(value.trim());
      else
        this.form.queryParams[index].acceptableValues.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }
  removeChips(index: number, value: string) {
    if (this.showFieldSet == 'params')
      this.form.params[index].acceptableValues = this.form.params[index].acceptableValues.filter(r => r != value);
    else
      this.form.queryParams[index].acceptableValues = this.form.queryParams[index].acceptableValues.filter(r => r != value);
  }
}
