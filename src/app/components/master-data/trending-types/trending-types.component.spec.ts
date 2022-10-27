import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingTypesComponent } from './trending-types.component';

describe('TrendingTypesComponent', () => {
  let component: TrendingTypesComponent;
  let fixture: ComponentFixture<TrendingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
