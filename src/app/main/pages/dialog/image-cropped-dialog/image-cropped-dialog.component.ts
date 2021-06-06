import {Component, OnInit} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from "ngx-image-cropper";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../../../../services/data.service";

@Component({
  selector: 'app-image-cropped-dialog',
  templateUrl: './image-cropped-dialog.component.html',
  styleUrls: ['./image-cropped-dialog.component.scss']
})
export class ImageCroppedDialogComponent implements OnInit {


    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    file: any;

    constructor(public matDialogRef: MatDialogRef<ImageCroppedDialogComponent>,
                public dialog: MatDialog,
                public restService: DataService) {
        this.matDialogRef.disableClose = true;

    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.file = new File([event.base64], "hello world.txt", {type: "text/plain;charset=utf-8"});

    }





    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

    onSubmit() {
        this.matDialogRef.beforeClose().subscribe(() => this.matDialogRef.close(this.file));
        this.dialog.closeAll();
    }

    ngOnInit() {
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }



}
