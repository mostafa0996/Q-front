import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceUserComponent } from './ecommerce-user.component';

describe('EcommerceUserComponent', () => {
  let component: EcommerceUserComponent;
  let fixture: ComponentFixture<EcommerceUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
