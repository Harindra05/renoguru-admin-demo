import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerDesignsComponent } from './designer-designs.component';

describe('DesignerDesignsComponent', () => {
  let component: DesignerDesignsComponent;
  let fixture: ComponentFixture<DesignerDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerDesignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
