import { Component, OnInit } from '@angular/core';
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
  apiDoc: any = {};
  subscription: Subscription = new Subscription();
  token: string = '710a1bdd358c1a9700c537ad523bfb646255ac02';
  error: any = null;
  result: any = null;
  loader: boolean = false;
  apiBase: string = environment.apiBaseUrl;
  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.pipe(
        switchMap((re: any) => {
          return this.http.get(`docs/get-collection/${re.apiId}`);
        })
      ).subscribe(res => {
        this.apiDoc = res || {};
        // map
      })
    )
  }



  evaluate() {
    this.loader = true;
    this.result = null;
    this.error = null;
    let url = this.apiBase + this.apiDoc.path;
    let inst: Observable<any>;
    if (this.apiDoc.method == 'get' || this.apiDoc.method == 'get') {
      inst = this.flatCall(url);
    } else {
      inst = this.payloadCall(url);
    }
    inst.toPromise()
      .then(res => {
        this.result = res;
      })
      .catch(e => (this.error = e))
      .finally(() => (this.loader = false));
  }

  flatCall(url: string) {
    let inst: Observable<any> = this.http.get(url, this.queryParams, { auth_token: this.token });
    if (this.apiDoc.method == 'delete') {
      inst = this.http.delete(url, { auth_token: this.token });
    }
    return inst;
  }
  payloadCall(url: string) {
    let inst: Observable<any>;
    switch (this.apiDoc.method) {
      case 'post':
        inst = this.http.post(url, this.params, { auth_token: this.token });
        break;
      case 'put':
        inst = this.http.put(url, this.params, { auth_token: this.token });
        break;
      case 'patch':
        inst = this.http.patch(url, this.params, { auth_token: this.token });
        break;
      default:
        inst = this.http.post(url, this.params, { auth_token: this.token });
        break;
    }
    return inst;
  }

}
