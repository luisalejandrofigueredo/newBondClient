import { TestBed } from '@angular/core/testing';

import { GdService } from './gd.service';

describe('GdService', () => {
  let service: GdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
