import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Vm, VmApi} from './shared/vm'


@Injectable()
export class VmserviceApiService {
  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:3000';
  }

  fetchVms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vms`)
                    .map(response => response.json());
  }

  fetchVmPaged(page, pagesize): Observable<VmApi[]> {
    console.log(`${this.baseUrl}/vms?page=${page}&pagesize=${pagesize}`)
    return this.http.get(`${this.baseUrl}/vms?page=${page}&pagesize=${pagesize}`)
                    .map(response => response.json())
                    .catch(this.handleError);
  }


  fetchVm(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vms/${id}`)
                    .map(response => response.json());
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
