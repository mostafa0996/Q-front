import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvantageComponent } from './edit-advantage.component';

describe('EditAdvantageComponent', () => {
  let component: EditAdvantageComponent;
  let fixture: ComponentFixture<EditAdvantageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdvantageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
