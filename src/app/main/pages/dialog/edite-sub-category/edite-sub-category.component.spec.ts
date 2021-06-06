import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeSubCategoryComponent } from './edit-sub-category.component';

describe('EditeSubCategoryComponent', () => {
  let component: EditeSubCategoryComponent;
  let fixture: ComponentFixture<EditeSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
