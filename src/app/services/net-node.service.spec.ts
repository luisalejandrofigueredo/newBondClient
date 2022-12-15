import { TestBed } from '@angular/core/testing';

import { NetNodeService } from './net-node.service';

describe('NetNodeService', () => {
  let service: NetNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
