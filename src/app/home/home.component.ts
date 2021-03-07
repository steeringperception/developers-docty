import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { HttpService } from '@services/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  treeControl = new NestedTreeControl<any>(node => node.apis);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(
    private http: HttpService
  ) {
    // this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: any) => !!node.apis && node.apis.length > 0;


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('docs/get-collection').toPromise()
      .then((res: any) => {
        this.dataSource.data = res
      }).catch(e => console.log(e))
  }

  add(node: any) {
    console.log(node)
  }

}
