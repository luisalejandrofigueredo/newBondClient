import { TestBed } from '@angular/core/testing';

import { LoginGuardChildrenGuard } from './login-guard-children.guard';

describe('LoginGuardChildrenGuard', () => {
  let guard: LoginGuardChildrenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuardChildrenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
