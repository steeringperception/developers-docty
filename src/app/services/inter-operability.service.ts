import { EventEmitter, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class InterOperabilityService {

  treeData: BehaviorSubject<any> = new BehaviorSubject([]);
  loadTree: EventEmitter<any> = new EventEmitter();


  constructor(
    private http: HttpService
  ) {
    this.loadTree.subscribe((res: any) => {
      this.getData();
    })
  }

  getData() {
    this.http.get('docs/get-collection').toPromise()
      .then((res: any) => {
        this.treeData.next(res);
      }).catch(e => console.log(e))
  }

}
