import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventConComponent } from './view-event-con.component';

describe('ViewEventConComponent', () => {
  let component: ViewEventConComponent;
  let fixture: ComponentFixture<ViewEventConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventConComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
