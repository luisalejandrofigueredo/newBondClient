import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesNodeComponent } from './modules-node.component';

describe('ModulesNodeComponent', () => {
  let component: ModulesNodeComponent;
  let fixture: ComponentFixture<ModulesNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
