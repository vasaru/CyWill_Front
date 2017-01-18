import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Vm, VmApi} from './shared/vm'


@Injectable()
export class VmserviceApiService {
  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:3000';
  }

  saveCost (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append("Accept", 'application/json');
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log('Posting cost');

        return this.http.post(`${this.baseUrl}/costs`, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    } 

  fetchCosts(page, pagesize,sort,filters): Observable<any> {
    return this.http.get(`${this.baseUrl}/costs`)
                    .map(response => response.json());
  }



  fetchVms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vms`)
                    .map(response => response.json());
  }

  fetchCostKeys(): Observable<any> {
    return this.http.get(`${this.baseUrl}/costkeys`)
                    .map(response => response.json());
  }

  fetchPagedData(url, page, pagesize,sort,filters): Observable<VmApi[]> {
    console.log(sort);
    console.log(filters);
    var sortstr="";
    var filtstr="";
    var baseurl=`${this.baseUrl}`+url;
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

  fetchVmDetails(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vms/${id}/details`)
                    .map(response => response.json());
  }

  
}
