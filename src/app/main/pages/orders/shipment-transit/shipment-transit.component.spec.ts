import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentTransitComponent } from './shipment-transit.component';

describe('ShipmentTransitComponent', () => {
  let component: ShipmentTransitComponent;
  let fixture: ComponentFixture<ShipmentTransitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentTransitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentTransitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
