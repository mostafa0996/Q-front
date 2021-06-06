import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDialogComponent } from './courier-dialog.component';

describe('CourierDialogComponent', () => {
  let component: CourierDialogComponent;
  let fixture: ComponentFixture<CourierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
