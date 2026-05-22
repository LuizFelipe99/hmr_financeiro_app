import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSummaryComponent } from './partner-summary.component';

describe('PartnerSummaryComponent', () => {
  let component: PartnerSummaryComponent;
  let fixture: ComponentFixture<PartnerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
