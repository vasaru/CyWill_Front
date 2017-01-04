import { Component, OnInit } from '@angular/core';
import { VmserviceApiService } from '../vmservice-api.service';
import { Vm, VmApi } from '../shared/vm';
import { VmProperty } from '../shared/vmproperty';
import {State} from "clarity-angular";

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.scss']
})
export class VmsComponent implements OnInit {
  vms: any = [];
  allvms: Vm[]
  total: number;
  loading: boolean = true;

  constructor(private _vmServiceApiService: VmserviceApiService) {}

    refresh(state: State) {
        this.loading = true;
        // We convert the filters from an array to a map,
        // because that's what our backend-calling service is expecting
        console.log(state.page.from + " "+ state.page.to);
        console.log(state.page.size)
/*
        let filters:{[prop:string]: any[]} = {};
        if (state.filters) {
            for (let filter of state.filters) {
                let {property, value} = <{property: string, value: string}>filter;
                filters[property] = [value];
            }
        }*/
        this._vmServiceApiService.fetchVmPaged(state.page.from, state.page.size)
                    .subscribe(
                      vms => { this.vms = vms; this.total = this.vms.total; console.log(this.total) }, 
                      error => console.log('Error fetching Vms')); 
/*        this.fetchVms().filter(filters)
            .sort(<{by: string, reverse: boolean}>state.sort)
            .fetch(state.page.from, state.page.size)
            .then((result: FetchResult) => {
                this.users = result.users;
                this.total = result.length;
                this.loading = false;
            }); */
        this.loading = false;
    }
    setTotal() {

    }

  ngOnInit() {

  }
}
