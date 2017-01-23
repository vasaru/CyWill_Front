import { Component, OnInit, ViewChild } from '@angular/core';
import { VmserviceApiService } from '../vmservice-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { Wizard } from "clarity-angular";
import { Observable } from 'rxjs/Rx';
import { Cost } from './costs';
import { State } from "clarity-angular";


@Component({
    selector: 'app-costs',
    templateUrl: './costs.component.html',
    styleUrls: ['./costs.component.scss']
})




export class CostsComponent implements OnInit {
    @ViewChild("wizard") wizard: Wizard;
    costkeys: any = [];
    costs: any = [];
    loading: boolean = false;
    total: number = 0;
    newcost: Cost = new Cost();
    open: boolean = false;
    currentState: State;


    model = {
        name: "",
        favorite: ""
    };


    submitted = false;

    addCostform = new FormGroup({
        costname: new FormControl('', Validators.required),
        cost: new FormControl('', Validators.required),
        currency: new FormControl('', Validators.required),
        itemtype: new FormControl('', Validators.required),
        validfrom: new FormControl('', Validators.required),
        validto: new FormControl('', Validators.required)
    });

    constructor(
        private _vmServiceApiService: VmserviceApiService
    ) {
    }

    recalculate() {
        console.log("In Recalculate");
        this._vmServiceApiService.recalculateCosts()
            .subscribe(
            costs => this.costs = costs,
            error => console.log('Error fetching Costs'));
        
    }

    refresh(state: State) {
        this.loading = true;
        console.dir(state);
        this.currentState = state;
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

        this._vmServiceApiService.fetchPagedData('/costs', state.page.from, state.page.size, <{ by: string, reverse: boolean }>state.sort, filters)
            .subscribe(
            costs => { this.costs = costs; this.total = this.costs.total; console.log(this.total) },
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



    ngOnInit() {
        this._vmServiceApiService.fetchCostKeys()
            .subscribe(
            costkeys => this.costkeys = costkeys,
            error => console.log('Error fetching Costs'));


    }

    getCosts() {
        this._vmServiceApiService.fetchCostKeys()
            .subscribe(
            costs => this.costs = costs,
            error => console.log('Error fetching Costs'));

    }

    addCost() {
        this._vmServiceApiService.saveCost(this.newcost).subscribe(
            data => {
                // refresh the list

                this.refresh(this.currentState);

                return true;
            },
            error => {
                console.error("Error saving cost!");
                return Observable.throw(error);
            }
        );
    }


}
