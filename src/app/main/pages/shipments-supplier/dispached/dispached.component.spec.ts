import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispachedComponent } from './dispached.component';

describe('DispachedComponent', () => {
  let component: DispachedComponent;
  let fixture: ComponentFixture<DispachedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispachedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
