import { Component, OnInit } from '@angular/core';
import { VmserviceApiService } from '../vmservice-api.service';
import { Vm, VmApi } from '../shared/vm';
import { VmProperty } from '../shared/vmproperty';
import { State } from "clarity-angular";

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
    showvm: any;
    vm_detail: any;

    constructor(private _vmServiceApiService: VmserviceApiService) { }

    refresh(state: State) {
        this.loading = true;
        // We convert the filters from an array to a map,
        // because that's what our backend-calling service is expecting
        console.log(state.page.from + " " + state.page.to);
        console.log(state.page.size)

        let filters: { [prop: string]: any } = {};
        if (state.filters) {
            for (let filter of state.filters) {
                let {property, value} = <{ property: string, value: string }>filter;
                filters[property] = value;
                console.log(property + " " + value)
            }
        }

        this._vmServiceApiService.fetchVmPaged(state.page.from, state.page.size, <{ by: string, reverse: boolean }>state.sort, filters)
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

    clicked(vm) {

        this._vmServiceApiService.fetchVmDetails(vm.vmid)
            .subscribe(
            vm_detail => { this.vm_detail = vm_detail; this.total = this.vms.total; console.log(this.total) },
            error => console.log('Error fetching Vm_details'));

        console.log("Clicked " + vm.servername);
        // console.log("Num cpu: "+this.vm_detail[0].numcpu);
        this.showvm = vm;

    }

    ngOnInit() {

    }
}
