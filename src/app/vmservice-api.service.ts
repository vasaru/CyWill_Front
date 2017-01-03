import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VmserviceApiService {
  baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://192.168.0.1:3000';
  }

  fetchVms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vms`)
                    .map(response => response.json());
  }

  fetchVm(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/vms/${id}`)
                    .map(response => response.json());
  }

}
