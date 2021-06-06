import {Component, OnInit} from '@angular/core';
import {BannerModel} from "../../../../../models/banner.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-edit-banner',
    templateUrl: './edit-banner.component.html',
    styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit {
    data: BannerModel;
    icon: string;
    bannerForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditBannerComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.bannerForm.controls;
    }


    addNewBanner() {
        // tslint:disable-next-line:prefer-const
        this.f.active.setValue(1);
        let banner: BannerModel = this.bannerForm.value as BannerModel;
        this.restService.addBanner(banner).then((res) => {
            this.dialogRef.close(res);
            this.toastr.success('The banner has been added successfully', '');
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let banner: BannerModel = this.bannerForm.value as BannerModel;
        this.restService.updateBanner(banner).then((res) => {
            this.toastr.success('The banner has been updated successfully', '');
            this.dialogRef.close(res);
        }).catch((err: HttpErrorResponse) => {
            this.toastr.error(err.error.message, '');
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    prepareForm() {
        this.bannerForm = this._formBuilder.group({
            _id: [null],
            active: [null],
            image: [null, [Validators.required]],
        });

    }


    onUpload(fileInput) {
        const fileData = <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);
        this.restService.uploadImage(formData).then((res) => {
            this.f.image.setValue(res.original.filename);
        }).catch((err: HttpErrorResponse) => {
            this.toastr.error(err.error.message, '');
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    close() {
        this._dialog.closeAll();
    }

    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            console.log(this.data);
            this.bannerForm.patchValue(this.data);
        }


    }


}
