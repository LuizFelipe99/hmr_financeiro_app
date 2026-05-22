import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceImportComponent } from './insurance-import.component';

describe('InsuranceImportComponent', () => {
  let component: InsuranceImportComponent;
  let fixture: ComponentFixture<InsuranceImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
