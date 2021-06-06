import {Component, OnInit} from '@angular/core';
import {HomeAboutModel} from "../../../../../models/home.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-add-content',
    templateUrl: './add-content.component.html',
    styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

    types = [
        {title: 'About', value: '1'},
        {title: 'Values', value: '2'},
        {title: 'Calculator', value: '3'},

    ];

    data: HomeAboutModel;
    aboutForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<AddContentComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.aboutForm.controls;
    }

    addAbout() {
        // tslint:disable-next-line:prefer-const
        let data: HomeAboutModel = this.aboutForm.value as HomeAboutModel;
        this.restService.addHomeAbout(data).then((res) => {
            this.toastr.success('The data has been added successfully', '');
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


    updateAbout() {
        // tslint:disable-next-line:prefer-const
        let data: HomeAboutModel = this.aboutForm.value as HomeAboutModel;
        this.restService.updateHomeAbout(data).then((res) => {
            this.toastr.success('The data has been updated successfully', '');
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
        this.aboutForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            description_ar: [null, [Validators.required]],
            description_en: [null, [Validators.required]],
            type: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.aboutForm.patchValue(this.data);
            console.log(this.aboutForm.value);
        }
    }


}
