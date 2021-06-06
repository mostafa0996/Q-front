import { Component, OnInit } from '@angular/core';
import { PartnerModel} from "../../../../../models/home.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {


    data: PartnerModel;
    partnerForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<AddPartnerComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.partnerForm.controls;
    }

    addPartner() {
        // tslint:disable-next-line:prefer-const
        let data: PartnerModel = this.partnerForm.value as PartnerModel;
        this.restService.addPartner(data).then((res) => {
            this.toastr.success('The partner has been added successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    updatePartner() {
        // tslint:disable-next-line:prefer-const
        let data: PartnerModel = this.partnerForm.value as PartnerModel;
        this.restService.updatePartner(data).then((res) => {
            this.toastr.success('The partner has been updated successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    onUpload(fileInput) {
        const fileData =  <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);
        this.restService.uploadImage(formData).then((res) => {
            this.f.image.setValue(res.original.filename);
            console.log(this.f.image.value);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    prepareForm() {
        this.partnerForm = this._formBuilder.group({
            image: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.partnerForm.patchValue(this.data);
        }
    }



}
