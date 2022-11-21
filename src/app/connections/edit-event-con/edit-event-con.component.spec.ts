import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventConComponent } from './edit-event-con.component';

describe('EditEventConComponent', () => {
  let component: EditEventConComponent;
  let fixture: ComponentFixture<EditEventConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventConComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
