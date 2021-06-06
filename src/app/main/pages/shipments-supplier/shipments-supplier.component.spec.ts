import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsSupplierComponent } from './shipments-supplier.component';

describe('ShipmentsSupplierComponent', () => {
  let component: ShipmentsSupplierComponent;
  let fixture: ComponentFixture<ShipmentsSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentsSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
