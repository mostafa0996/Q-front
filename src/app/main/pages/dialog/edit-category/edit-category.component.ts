import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../../../models/category";


@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
    data: Category;
    categoryForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditCategoryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;
        dialogRef.disableClose = true;

    }


    get f() {
        return this.categoryForm.controls;
    }

    addNewCategory() {
        // tslint:disable-next-line:prefer-const
        let categoryModel: Category = this.categoryForm.value as Category;
        this.restService.addCategory(categoryModel).then((res) => {
            this.toastr.success('The category has been added successfully', '');
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

    onUpload(fileInput) {
        const fileData =  <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);
        this.restService.uploadImage(formData).then((res) => {
            this.f.icon.setValue(res.original.filename);
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
        let categoryModel: Category = this.categoryForm.value as Category;
        this.restService.updateCategory(categoryModel).then((res) => {
            this.toastr.success('The category has been updated successfully', '');
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
        this.categoryForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            icon: [null, [Validators.required]],
            active: [null, [Validators.required]],
            weight: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.categoryForm.patchValue(this.data);
        }
    }
}
