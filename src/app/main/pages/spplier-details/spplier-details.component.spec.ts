import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpplierDetailsComponent } from './spplier-details.component';

describe('SpplierDetailsComponent', () => {
  let component: SpplierDetailsComponent;
  let fixture: ComponentFixture<SpplierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpplierDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpplierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
