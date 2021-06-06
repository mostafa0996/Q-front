import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../../services/data.service";
import {ContentModel} from "../../../../../models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageCroppedDialogComponent} from "../../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    contentForm: FormGroup;
    ckeConfig: any;
    log: string;

    res: any;
    constructor(private _formBuilder: FormBuilder,
                private toastr: ToastrService,
                private dialog: MatDialog,
                public restService: DataService) {
    }


    get f() {
        return this.contentForm.controls;
    }


    prepareForm() {
        this.contentForm = this._formBuilder.group({
            _id: [null],
            content_ar: [null, [Validators.required]],
            content_en: [null, [Validators.required]],
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            image: [null , [Validators.required]],
            type: [null, [Validators.required]],
        });
    }

    saveContent() {
        let model: ContentModel = this.contentForm.value as ContentModel;
        this.restService.saveContent(model).then((res) => {
                this.toastr.success( 'The content has been added successfully', '');
        }).catch((err: HttpErrorResponse) => {
        });
    }

    getContent(id) {
        this.restService.getContent(id).then((res) => {
            let result: ContentModel = res as ContentModel;
            this.contentForm.patchValue(result);
        }).catch((err: HttpErrorResponse) => {
        });
    }

    onUpload(fileInput) {
        const fileData = <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);
        this.restService.uploadImage(formData).then((res) => {
            this.f.cover.setValue(res.original.filename);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    openDialog() {
        const dialog = this.dialog.open(ImageCroppedDialogComponent);
        dialog.afterClosed().subscribe(result => {
            if(result){
                    this.uploadTextFile(result);
            }
        });
    }


    uploadTextFile(file) {
        let formData = new FormData();
        formData.append('base64', file);
        this.restService.uploadTextFile(formData).then((res) => {
            this.f.image.setValue(res.original.filename);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }

        });
    }



    ngOnInit() {
        this.prepareForm();
        this.getContent(1);
        this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
        };
    }


}
