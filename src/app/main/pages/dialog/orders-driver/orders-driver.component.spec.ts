import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDriverComponent } from './orders-driver.component';

describe('OrdersDriverComponent', () => {
  let component: OrdersDriverComponent;
  let fixture: ComponentFixture<OrdersDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
