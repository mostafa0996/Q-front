import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CityModel} from "../../../../../models/city";

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

    data: CityModel;
    cityForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditCountryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.cityForm.controls;
    }

    addNewType() {
        // tslint:disable-next-line:prefer-const
        let cityModel: CityModel = this.cityForm.value as CityModel;
        this.restService.addCity(cityModel).then((res) => {
            this.toastr.success('The city has been added successfully', '');
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
        let cityModel: CityModel = this.cityForm.value as CityModel;
        this.restService.updateCity(cityModel).then((res) => {
            this.toastr.success('The city has been updated successfully', '');
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
        this.cityForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            active: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.cityForm.patchValue(this.data);
        }
    }

}
