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

  fetchVmPaged(page, pagesize,sort,filters): Observable<VmApi[]> {
    console.log(sort);
    console.log(filters);
    var sortstr="";
    var filtstr="";
    var baseurl=`${this.baseUrl}/vms`;
    console.log("Filters length = "+Object.keys(filters).length)
    if(Object.keys(filters).length > 0) {
      var tmp=new Buffer(JSON.stringify(filters)).toString('base64');
      filtstr="&filters="+tmp;
    }

    if(sort) {
      console.log("Sort order is set");
      var tmp= new Buffer(JSON.stringify(sort)).toString('base64');
      sortstr="&sort="+tmp
    }

    console.log(filtstr);
    Object.keys(filters).forEach(function(key,index) {
      console.log("Filter by "+key+" value "+filters[key])

    });
    baseurl+=`?page=${page}&pagesize=${pagesize}`;
    baseurl+=sortstr+filtstr;
    console.log(baseurl);
    return this.http.get(baseurl)
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
