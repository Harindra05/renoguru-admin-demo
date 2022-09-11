import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsDocumentComponent } from './terms-document.component';

describe('TermsDocumentComponent', () => {
  let component: TermsDocumentComponent;
  let fixture: ComponentFixture<TermsDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
