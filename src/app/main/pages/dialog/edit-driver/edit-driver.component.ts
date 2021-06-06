import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../../models/user.model";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import {EditAdvantageComponent} from "../edit-advantage/edit-advantage.component";
import {MatTableDataSource} from "@angular/material/table";


@Component({
    selector: 'app-edit-driver',
    templateUrl: './edit-driver.component.html',
    styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {
    driverForm: FormGroup;
    data: UserModel;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                public dialog: MatDialog,
                private toastr: ToastrService,
                public dialogRef: MatDialogRef<EditDriverComponent>,
    ) {


    }

    get f() {
        return this.driverForm.controls;
    }

    prepareForm() {
        this.driverForm = this._formBuilder.group({
            active: [null],
            email: ['', [Validators.required, Validators.email]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            role: [null],
            company: [null],
            _id: [null]

        });
    }



    addUser() {
        this.f.active.setValue('1');
        this.f.role.setValue('driver');
        let user: UserModel = this.driverForm.value as UserModel;
        this.restService.createUser(user).then((res) => {
            this.driverForm.reset();
            Object.keys(this.driverForm.controls).forEach(key => {
                this.driverForm.controls[key].setErrors(null);
            });
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
            this.toastr.error(err.error.message , '');
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    updateUser() {
        // tslint:disable-next-line:prefer-const
        let user: UserModel = this.driverForm.value as UserModel;
        this.restService.activeSupplier(user).then((res) => {
            this.dialogRef.close(res.user);
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
        let decoded = jwt_decode(localStorage.getItem('auth_deliver_admin'));
        this.f.company.setValue(decoded.sub);
        if(this.data){
            this.driverForm.patchValue(this.data);
        }

    }

}
