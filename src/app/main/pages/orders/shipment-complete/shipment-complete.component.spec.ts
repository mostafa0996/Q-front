import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentCompleteComponent } from './shipment-complete.component';

describe('ShipmentCompleteComponent', () => {
  let component: ShipmentCompleteComponent;
  let fixture: ComponentFixture<ShipmentCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
