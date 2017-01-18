import { Component, OnInit } from '@angular/core';
import { VmserviceApiService } from '../vmservice-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Cost } from './costs';


@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})




export class CostsComponent implements OnInit {
  costs: any = [];
  newcost:Cost = new Cost();

  constructor (
    private _vmServiceApiService: VmserviceApiService,
    
  ) {}

  ngOnInit() {
      this._vmServiceApiService.fetchCostKeys()
              .subscribe(
                costs => this.costs = costs,
                error => console.log('Error fetching Costs')); 

        
    }

    addCost() {
      console.dir(this.newcost);
    }


  }
