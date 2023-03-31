import { TestBed } from '@angular/core/testing';

import { TrigonometricService } from './trigonometric.service';

describe('TrigonometricService', () => {
  let service: TrigonometricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrigonometricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
