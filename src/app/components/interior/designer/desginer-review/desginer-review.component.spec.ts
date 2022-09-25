import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesginerReviewComponent } from './desginer-review.component';

describe('DesginerReviewComponent', () => {
  let component: DesginerReviewComponent;
  let fixture: ComponentFixture<DesginerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesginerReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesginerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
