import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamoSummaryComponent } from './ramo-summary.component';

describe('RamoSummaryComponent', () => {
  let component: RamoSummaryComponent;
  let fixture: ComponentFixture<RamoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamoSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
