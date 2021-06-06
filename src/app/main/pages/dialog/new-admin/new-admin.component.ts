import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../../app.service';
import {DataService} from '../../../../../services/data.service';
import {UserModel} from '../../../../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-new-admin',
    templateUrl: './new-admin.component.html',
    styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {
    adminForm: FormGroup;
    userForm: FormGroup;
    data: UserModel;
    role: string;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                private toastr: ToastrService,
                public dialogRef: MatDialogRef<NewAdminComponent>,
                public restService: DataService) {
    }

    get f() {
        return this.adminForm.controls;
    }

    get u() {
        return this.userForm.controls;
    }

    prepareForm() {
        this.adminForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            designation: [null, [Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            role: [null, [Validators.required]],
            password: [''],
            _id: [null]
        });

        this.userForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            role: [null, [Validators.required]],
            _id: [null]
        });
    }

    updateUser() {
        // tslint:disable-next-line:prefer-const
        let user: UserModel;
        if (this.role === 'admin') {
            user = this.adminForm.value as UserModel;
        } else {
            user = this.userForm.value as UserModel;
        }

        this.restService.activeSupplier(user).then((res) => {
            this.toastr.success('The account has been updated successfully', '');
            this.dialogRef.close(res.user);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    addUser() {
        let user: UserModel;
        if (this.role === 'admin') {
            user = this.adminForm.value as UserModel;
        } else {
            user = this.userForm.value as UserModel;
        }
        this.restService.createUser(user).then((res) => {
            this.toastr.success('The account has been created successfully', '');
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


    ngOnInit() {
        this.prepareForm();

        if (this.data) {
            this.adminForm.patchValue(this.data);
            this.f.password.setValue('');
            console.log(this.role);
        } else {
            if (this.role === 'admin') {
                this.f.role.setValue(this.role);
                this.f.active.setValue('1');
            } else {
                this.u.role.setValue(this.role);
                this.u.active.setValue('1');
            }

        }
    }

}
