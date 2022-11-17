import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConnectionsComponent } from './edit-connections.component';

describe('EditConnectionsComponent', () => {
  let component: EditConnectionsComponent;
  let fixture: ComponentFixture<EditConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConnectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
