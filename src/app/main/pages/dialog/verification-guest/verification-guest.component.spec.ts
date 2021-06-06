import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationGuestComponent } from './verification-guest.component';

describe('VerificationGuestComponent', () => {
  let component: VerificationGuestComponent;
  let fixture: ComponentFixture<VerificationGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
