import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCroppedDialogComponent } from './image-cropped-dialog.component';

describe('ImageCroppedDialogComponent', () => {
  let component: ImageCroppedDialogComponent;
  let fixture: ComponentFixture<ImageCroppedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCroppedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCroppedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
