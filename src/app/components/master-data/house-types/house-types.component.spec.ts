import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseTypesComponent } from './house-types.component';

describe('HouseTypesComponent', () => {
  let component: HouseTypesComponent;
  let fixture: ComponentFixture<HouseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
