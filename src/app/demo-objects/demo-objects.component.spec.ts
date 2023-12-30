import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoObjectsComponent } from './demo-objects.component';

describe('DemoObjectsComponent', () => {
  let component: DemoObjectsComponent;
  let fixture: ComponentFixture<DemoObjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoObjectsComponent]
    });
    fixture = TestBed.createComponent(DemoObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
