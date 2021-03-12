import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { HttpService } from '@app/services/http.service';
import { InterOperabilityService } from '@app/services/inter-operability.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  treeControl = new NestedTreeControl<any>(node => node.apis);
  dataSource = new MatTreeNestedDataSource<any>();
  subscription: Subscription = new Subscription();
  constructor(
    private http: HttpService,
    private io: InterOperabilityService
  ) {
  }

  hasChild = (_: number, node: any) => !!node.apis //&& node.apis.length > 0;


  ngOnInit(): void {
    this.subscription.add(
      this.io.treeData.subscribe(res => {
        this.dataSource.data = res;
        this.treeControl.dataNodes = res;
        this.treeControl.expandAll();
      })
    )
  }

  ngAfterViewInit() {
    this.io.loadTree.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
