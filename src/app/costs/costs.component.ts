import { Component, OnInit, ViewChild } from '@angular/core';
import { VmserviceApiService } from '../vmservice-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Wizard } from "clarity-angular";
import {Observable} from 'rxjs/Rx';
import { Cost } from './costs';
import {State} from "clarity-angular";


@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})




export class CostsComponent implements OnInit {
  @ViewChild("wizard") wizard: Wizard;
  costkeys: any = [];
  costs: any = [] ;
  loading: boolean = false;
  total: number = 0;
  newcost:Cost = new Cost();
    open: boolean = false;

    model = {
        name: "",
        favorite: ""
    };

  constructor (
    private _vmServiceApiService: VmserviceApiService,
    
  ) {}

    refresh(state: State) {
        this.loading = true;
        // We convert the filters from an array to a map,
        // because that's what our backend-calling service is expecting
        console.log(state.page.from + " "+ state.page.to);
        console.log(state.page.size)

        let filters:{[prop:string]: any} = {};
        if (state.filters) {
            for (let filter of state.filters) {
                let {property, value} = <{property: string, value: string}>filter;
                filters[property] = value;
                console.log(property+" "+value)
            }
        }
        
        this._vmServiceApiService.fetchPagedData('/costs',state.page.from, state.page.size,<{by: string, reverse: boolean}>state.sort,filters)
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
//          this.getCosts();
          return true;
        },
        error => {
          console.error("Error saving cost!");
          return Observable.throw(error);
        }
      );
    }


  }
