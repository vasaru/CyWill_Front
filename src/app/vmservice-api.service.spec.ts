/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VmserviceApiService } from './vmservice-api.service';

describe('VmserviceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VmserviceApiService]
    });
  });

  it('should ...', inject([VmserviceApiService], (service: VmserviceApiService) => {
    expect(service).toBeTruthy();
  }));
});
