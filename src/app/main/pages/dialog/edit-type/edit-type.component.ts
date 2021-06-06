import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeModel} from "../../../../../models/type.model";
import {SubCategoryModel} from "../../../../../models/SubCateoryModel";

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {

    data: TypeModel;
    typeForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditTypeComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.typeForm.controls;
    }

    addNewType() {
        // tslint:disable-next-line:prefer-const
        let typeModel: TypeModel = this.typeForm.value as TypeModel;
        this.restService.addType(typeModel).then((res) => {
            this.toastr.success('The type has been added successfully', '');
            this.dialogRef.close(res);

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
        let typeModel: TypeModel = this.typeForm.value as TypeModel;
        this.restService.updateType(typeModel).then((res) => {
            this.toastr.success('The type has been updated successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    prepareForm() {
        this.typeForm = this._formBuilder.group({
            duration: [null, [Validators.required]],
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            active: [null, [Validators.required]],
            price: [null, [Validators.required]],
            image: [null , [Validators.required]],
            _id: [null]
        });

    }

    close() {
        this._dialog.closeAll();
    }

    onUpload(fileInput) {
        const fileData =  <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);
        this.restService.uploadImage(formData).then((res) => {
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
        if (this.data) {
            this.typeForm.patchValue(this.data);
        }
    }

}
