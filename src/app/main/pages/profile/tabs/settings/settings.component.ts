import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../../../services/data.service";
import {MustMatch} from "../../../../../_helpers/must-match.validator";
import {AppService} from "../../../../../app.service";
import {UserModel} from "../../../../../../models/user.model";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


    privacyForm: FormGroup;

    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        public appService: AppService,
        private toastr: ToastrService,
        private restService: DataService
    ) {
    }

    get f() {
        return this.privacyForm.controls;
    }

    prepareForm() {
        this.privacyForm = this.fb.group({
            new_password: ['', [ Validators.required,  Validators.minLength(8), Validators.maxLength(16)]],
            ConfirmPassword: ['' , [Validators.required]],
            old_password: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(16)]],
        }, {
            validator: MustMatch('new_password', 'ConfirmPassword')
        });
    }


    updateProfile() {
        const user: UserModel = this.privacyForm.value as UserModel;
        this.restService.updatePassword(user).then((res) => {
            this.toastr.success( res.message , '');
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    // this.restService.refreshTokenUser();
                }
            }
        });
    }

    ngOnInit(): void {
        this.prepareForm();
    }


}
