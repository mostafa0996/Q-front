import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../../models/category";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {SubCategoryModel} from "../../../../../models/SubCateoryModel";

@Component({
    selector: 'app-edit-sub-category',
    templateUrl: './edit-sub-category.component.html',
    styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {


    data: SubCategoryModel;
    subCategoryForm: FormGroup;
    categories: Category[] = [];

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditSubCategoryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.subCategoryForm.controls;
    }

    addNewSub() {
        // tslint:disable-next-line:prefer-const
        if (this.f.other.value) {
            this.f.other.setValue(1);
        } else {
            this.f.other.setValue(0);

        }

        let subCategoryModel: SubCategoryModel = this.subCategoryForm.value as SubCategoryModel;
        this.restService.addSubCategory(subCategoryModel).then((res) => {
            this.toastr.success('The sub category has been added successfully', '');
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
        if (this.f.other.value) {
             this.f.other.setValue(1);
        } else {
            this.f.other.setValue(0);

        }


        let subCategoryModel: SubCategoryModel = this.subCategoryForm.value as SubCategoryModel;
        this.restService.updateSubCategory(subCategoryModel).then((res) => {
            this.toastr.success('The sub category has been updated successfully', '');
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

    getCategories() {
        this.restService.getCategories().then((res) => {
            this.categories = res.results;
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
        this.subCategoryForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            active: [null, [Validators.required]],
            icon: [null, [Validators.required]],
            category: [null, [Validators.required]],
            _id: [null],
            other: [null],
            note_en: [null],
            note_ar: [null]
        });

    }


    onUpload(fileInput) {
        const fileData = <File>fileInput.target.files[0];
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

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        this.getCategories();
        if (this.data) {
            this.subCategoryForm.patchValue(this.data);
            this.f.category.setValue(this.data.categoryObj._id);
        }
    }
}
