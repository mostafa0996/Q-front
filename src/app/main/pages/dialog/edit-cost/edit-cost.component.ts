import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CostModel} from "../../../../../models/cost.model";
import {CityModel} from "../../../../../models/city";
import {Category} from "../../../../../models/category";

@Component({
  selector: 'app-edit-cost',
  templateUrl: './edit-cost.component.html',
  styleUrls: ['./edit-cost.component.scss']
})
export class EditCostComponent implements OnInit {


    data: CostModel;
    costForm: FormGroup;
    cities: CityModel[] = [];
    categories: Category[] = [];


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditCostComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.costForm.controls;
    }

    addNewCost() {
        // tslint:disable-next-line:prefer-const
        let costModel: CostModel = this.costForm.value as CostModel;
        this.restService.addCost(costModel).then((res) => {
            this.toastr.success('The cost has been added successfully', '');
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
        let costModel: CostModel = this.costForm.value as CostModel;
        this.restService.updateCost(costModel).then((res) => {
            this.toastr.success('The cost has been updated successfully', '');
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
        this.costForm = this._formBuilder.group({
            from: [null, [Validators.required]],
            to: [null, [Validators.required]],
            cost: [null, [Validators.required]],
            category: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }

    getCities() {
        this.restService.getCities().then((res) => {
            this.cities = res.results;
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
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    ngOnInit() {
        this.prepareForm();
        this.getCities();
        this.getCategories();

        if (this.data) {
            this.costForm.patchValue(this.data);
        }else{
            this.f.cost.setValue(0);
        }
    }

}
