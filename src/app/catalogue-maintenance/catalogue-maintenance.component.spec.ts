import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueMaintenanceComponent } from './catalogue-maintenance.component';

describe('CatalogueMaintenanceComponent', () => {
  let component: CatalogueMaintenanceComponent;
  let fixture: ComponentFixture<CatalogueMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
