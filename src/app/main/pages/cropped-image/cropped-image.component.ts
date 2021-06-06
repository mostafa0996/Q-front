import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {MatDialog} from '@angular/material';
import {DataService} from "../../../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../app.service";

@Component({
    selector: 'app-cropped-image',
    templateUrl: './cropped-image.component.html',
    styleUrls: ['./cropped-image.component.scss']
})
export class CroppedImageComponent implements OnInit {
    @Input() image = '';
    imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    isInsideDialog = true;
    file: any;
    @Output() url: EventEmitter<string> = new EventEmitter();


    constructor(
        private dialog: MatDialog,
        private toastr: ToastrService,
        private appService: AppService,
        private restService: DataService) {


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
        console.log('Image loaded');
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


    uploadTextFile() {
        let formData = new FormData();
        formData.append('base64', this.file);
        this.restService.uploadTextFile(formData).then((res) => {
                this.url.emit(res.original.filename);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }

        });
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
