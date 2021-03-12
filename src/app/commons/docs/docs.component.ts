import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@app/services/http.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  page: any = {};
  pageData: any = {};
  subscription: Subscription = new Subscription();
  loader: boolean = false
  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.data
        .pipe(
          switchMap(res => {
            this.page = res;
            this.pageData = JSON.parse(JSON.stringify(res));
            console.log(res)
            return this.http.get(`docs/get-${res.code}`)
          })
        ).subscribe(res => {
          this.page = Object.assign(this.page, (res || {}));
          console.log(res);

        })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm(f: any) {
    this.loader = true;
    this.http.post(`documentor/update-${this.page.code}`, this.page)
      .toPromise()
      .then(res => this.page = res)
      .catch(e => console.log(e))
      .finally(() => this.loader = false);
  }

}
