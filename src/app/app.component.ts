import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'developers';

  constructor(
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(res => {
      if (!!res.apiKey) {
        localStorage.setItem('token', res.apiKey);
      }
    })
  }
}
