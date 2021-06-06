import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CounterModel} from "../../../../../models/home.model";

@Component({
  selector: 'app-add-counter',
  templateUrl: './add-counter.component.html',
  styleUrls: ['./add-counter.component.scss']
})
export class AddCounterComponent implements OnInit {

    data: CounterModel;
    counterForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<AddCounterComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.counterForm.controls;
    }

    addCounter() {
        // tslint:disable-next-line:prefer-const
        let data: CounterModel = this.counterForm.value as CounterModel;
        this.restService.addCounter(data).then((res) => {
            this.toastr.success('The counter has been added successfully', '');
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


    updateCounter() {
        // tslint:disable-next-line:prefer-const
        let data: CounterModel = this.counterForm.value as CounterModel;
        this.restService.updateCounter(data).then((res) => {
            this.toastr.success('The counter has been updated successfully', '');
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
        this.counterForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            value: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.counterForm.patchValue(this.data);
        }
    }


}
