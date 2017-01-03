import { Component, OnInit } from '@angular/core';
import { VmserviceApiService } from '../vmservice-api.service';

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.scss']
})
export class VmsComponent implements OnInit {
  vms: any = [];
  constructor(private _vmServiceApiService: VmserviceApiService) {}
 
  ngOnInit() {
    this._vmServiceApiService.fetchVms()
                    .subscribe(
                      vms => { this.vms = vms },
                      error => console.log('Error fetching Vms'));
  }
}
