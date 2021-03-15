import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  subs: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let sub = this.route.queryParams.subscribe(res => {
      if (!!res.token) {
        localStorage.setItem('authToken', res.token);
        this.router.navigate(['/', 'documentor']);
      } else {
        this.router.navigate(['/']);
      }
    })
    this.subs.add(sub);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
