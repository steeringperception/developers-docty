import { Component, OnInit } from '@angular/core';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'app-docs-viewer',
  templateUrl: './docs-viewer.component.html',
  styleUrls: ['./docs-viewer.component.scss']
})
export class DocsViewerComponent implements OnInit {

  prologue: any = null;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    // this.http.get('')
  }

}
