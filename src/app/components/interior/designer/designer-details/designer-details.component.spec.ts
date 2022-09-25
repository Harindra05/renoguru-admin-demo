import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerDetailsComponent } from './designer-details.component';

describe('DesignerDetailsComponent', () => {
  let component: DesignerDetailsComponent;
  let fixture: ComponentFixture<DesignerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
