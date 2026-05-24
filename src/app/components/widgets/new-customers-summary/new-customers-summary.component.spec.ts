import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomersSummaryComponent } from './new-customers-summary.component';

describe('NewCustomersSummaryComponent', () => {
  let component: NewCustomersSummaryComponent;
  let fixture: ComponentFixture<NewCustomersSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomersSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCustomersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
