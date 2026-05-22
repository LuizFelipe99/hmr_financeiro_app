import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceImportListComponent } from './insurance-import-list.component';

describe('InsuranceImportListComponent', () => {
  let component: InsuranceImportListComponent;
  let fixture: ComponentFixture<InsuranceImportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceImportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceImportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
