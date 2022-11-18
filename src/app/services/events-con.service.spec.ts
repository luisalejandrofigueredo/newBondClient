import { TestBed } from '@angular/core/testing';

import { EventsConService } from './events-con.service';

describe('EventsConService', () => {
  let service: EventsConService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsConService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
