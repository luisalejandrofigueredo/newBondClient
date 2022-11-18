import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventConComponent } from './add-event-con.component';

describe('AddEventConComponent', () => {
  let component: AddEventConComponent;
  let fixture: ComponentFixture<AddEventConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventConComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
