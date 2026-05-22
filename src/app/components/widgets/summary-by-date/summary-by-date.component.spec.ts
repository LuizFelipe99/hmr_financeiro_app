import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryByDateComponent } from './summary-by-date.component';

describe('SummaryByDateComponent', () => {
  let component: SummaryByDateComponent;
  let fixture: ComponentFixture<SummaryByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryByDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
