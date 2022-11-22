import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBondComponent } from './view-bond.component';

describe('ViewBondComponent', () => {
  let component: ViewBondComponent;
  let fixture: ComponentFixture<ViewBondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
