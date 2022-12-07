import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignLabelComponent } from './align-label.component';

describe('AlignLabelComponent', () => {
  let component: AlignLabelComponent;
  let fixture: ComponentFixture<AlignLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlignLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
