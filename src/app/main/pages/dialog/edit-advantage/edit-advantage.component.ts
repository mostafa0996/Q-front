import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {AdvantageModel} from "../../../../../models/advantage.model";

@Component({
  selector: 'app-edit-advantage',
  templateUrl: './edit-advantage.component.html',
  styleUrls: ['./edit-advantage.component.scss']
})
export class EditAdvantageComponent implements OnInit {

    data: AdvantageModel;
    editAdvantage: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditAdvantageComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.editAdvantage.controls;
    }

    addNewAdvantage() {
        // tslint:disable-next-line:prefer-const
        let advantageModel: AdvantageModel = this.editAdvantage.value as AdvantageModel;
        this.restService.addAdvantage(advantageModel).then((res) => {
            this.toastr.success('The advantage has been added successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }



    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let advantageModel: AdvantageModel = this.editAdvantage.value as AdvantageModel;
        this.restService.updateAdvantage(advantageModel).then((res) => {
            this.toastr.success('The advantage has been updated successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    prepareForm() {
        this.editAdvantage = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            description_ar: [null, [Validators.required]],
            description_en: [null, [Validators.required]],
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
            this.editAdvantage.patchValue(this.data);
        }
    }
}
