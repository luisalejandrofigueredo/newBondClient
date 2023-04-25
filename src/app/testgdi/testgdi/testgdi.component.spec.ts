import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestgdiComponent } from './testgdi.component';

describe('TestgdiComponent', () => {
  let component: TestgdiComponent;
  let fixture: ComponentFixture<TestgdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestgdiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestgdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
