import { Component, Input, OnInit } from '@angular/core';

import { VmserviceApiService } from '../vmservice-api.service';

@Component({
  selector: 'vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.scss']
})
export class VmComponent implements OnInit {
  @Input() vmID: string;
  vm;
   constructor(private _vmServiceApiService: VmserviceApiService) {}

  ngOnInit() {
/*        this._cyWillVmAPIService.fetchVm(this.vmID).subscribe(data => {
      this.vm = data;
    }, error => console.log('Could not load item' + this.vmID)); */
  }

}
