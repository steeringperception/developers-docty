import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-api-viewer',
  templateUrl: './api-viewer.component.html',
  styleUrls: ['./api-viewer.component.scss']
})
export class ApiViewerComponent implements OnInit {
  params: any = {};
  queryParams: any = {};
  routeParams: any[] = [];
  apiDoc: any = {};
  subscription: Subscription = new Subscription();
  token: string = null;
  error: any = null;
  result: any = null;
  loader: boolean = false;
  apiBase: string = environment.apiBaseUrl;
  cUrl = this.apiBase;
  tableHeader: any[] = [];
  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.pipe(
        switchMap((re: any) => {
          this.result = null;
          this.params = [];
          this.queryParams = [];
          this.routeParams = [];
          return this.http.get(`docs/get-collection/${re.apiId}`);
        })
      ).subscribe(res => {
        this.apiDoc = res || {};
        this.getRouteParams();
      })
    )
    if (!!!this.token) {
      this.token = localStorage.getItem('apiKey');
    }
  }

  getRouteParams() {
    this.cUrl = this.apiBase + this.apiDoc.path;
    let arr = this.apiDoc.path.split('{');
    arr.forEach(element => {
      if (element.includes('}')) {
        let e = element.replace(/\}.*/, '');
        this.routeParams.push({ param: e });
      }
    });
  }

  mapUrl() {
    this.cUrl = this.apiBase + this.apiDoc.path;
    this.routeParams.forEach(obj => {
      if (!!obj.value) {
        let key = `{${obj.param}}`;
        this.cUrl = this.cUrl.replace(key, obj.value);
      }
    })
  }

  evaluate(f: NgForm) {
    if (f.form.status == 'INVALID') {
      f.form.markAllAsTouched();
      return;
    }
    this.loader = true;
    this.result = null;
    this.error = null;
    let inst: Observable<any>;
    if (this.apiDoc.method == 'get' || this.apiDoc.method == 'get') {
      inst = this.flatCall(this.cUrl);
    } else {
      inst = this.payloadCall(this.cUrl);
    }
    inst.toPromise()
      .then(res => {
        this.result = res;
        if (!!res.data && !!res.data.length) {
          this.makeTableData();
        }
      })
      .catch(e => (this.error = e))
      .finally(() => (this.loader = false));
  }

  flatCall(url: string) {
    let inst: Observable<any> = this.http.get(url, this.queryParams, { apikey: this.token });
    if (this.apiDoc.method == 'delete') {
      inst = this.http.delete(url, { apikey: this.token });
    }
    return inst;
  }
  payloadCall(url: string) {
    let inst: Observable<any>;
    switch (this.apiDoc.method) {
      case 'post':
        inst = this.http.post(url, this.params, { apikey: this.token });
        break;
      case 'put':
        inst = this.http.put(url, this.params, { apikey: this.token });
        break;
      case 'patch':
        inst = this.http.patch(url, this.params, { apikey: this.token });
        break;
      default:
        inst = this.http.post(url, this.params, { apikey: this.token });
        break;
    }
    return inst;
  }

  makeTableData() {
    this.tableHeader = Object.keys(this.result.data[0]);
  }

  saveToken() {
    localStorage.setItem('apiKey', this.token);
  }

}
