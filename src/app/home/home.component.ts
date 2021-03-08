import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { HttpService } from '@services/http.service';
import Swal from 'sweetalert2';
import { encrypt } from '@app/commons/helper';


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

  hasChild = (_: number, node: any) => !!node.apis //&& node.apis.length > 0;


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('docs/get-collection').toPromise()
      .then((res: any) => {
        this.dataSource.data = res
      }).catch(e => console.log(e))
  }

  addFolder(data: any = {}) {
    Swal.fire({
      title: "Create/Rename folder",
      input: 'text',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      inputValue: data.title || '',
      preConfirm: async (name) => {
        await this.http.post(`documentor/folder`, {
          title: name, parent: (data.parent || 1), id: (data.id || null)
        }).toPromise().finally(() => {
          this.getData();
        })
      }
    })
  }
  deleteFolder(node: any) {
    Swal.fire({
      title: `Are you sure want to delete folder ${node.title}`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      icon: "warning",
      preConfirm: async () => {
        await this.http.delete(`documentor/folder/${node.id}`)
          .toPromise()
          .finally(() => {
            this.getData();
          })
      }
    })
  }
  encrypt(int: number) {
    return encrypt(int)
  }

}
