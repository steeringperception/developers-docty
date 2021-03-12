import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-docs-viewer',
  templateUrl: './docs-viewer.component.html',
  styleUrls: ['./docs-viewer.component.scss']
})
export class DocsViewerComponent implements OnInit {

  page: any = {};
  subscription: Subscription = new Subscription();
  loader: boolean = false;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.data
        .pipe(
          switchMap(res => {
            return this.http.get(`docs/get-${res.code}`)
          })
        ).subscribe(res => {
          this.page = res;
        })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
