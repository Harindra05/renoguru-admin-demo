import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeIdComponent } from './property-type-id.component';

describe('PropertyTypeIdComponent', () => {
  let component: PropertyTypeIdComponent;
  let fixture: ComponentFixture<PropertyTypeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
