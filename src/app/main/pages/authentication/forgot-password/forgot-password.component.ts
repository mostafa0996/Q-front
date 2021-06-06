import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {UserModel} from "../../../../../models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../../services/data.service";

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private  restService: DataService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }


    get f(){
        return this.forgotPasswordForm.controls;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */



    // onSubmit() {
    //     // tslint:disable-next-line:prefer-const
    //     let userModel: UserModel = this.forgotPasswordForm.value as UserModel;
    //     this.restService.forgetPassword(userModel).then((res) => {
    //         if (res.code === 200) {
    //             localStorage.setItem('email' , userModel.email);
    //             this.toastr.success(res.message, '');
    //             setTimeout(() => {
    //                 this.router.navigateByUrl('/pages/reset-password');
    //             }, 1500);
    //         } else {
    //             this.toastr.error(res.message, '');
    //         }
    //
    //
    //     }).catch((err: HttpErrorResponse) => {
    //
    //     });
    // }

    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let userModel: UserModel = this.forgotPasswordForm.value as UserModel;
        this.restService.sendOTPWithOutCheck(userModel).then((res) => {
            localStorage.setItem('phone' , userModel.phone);
            this.toastr.success(res.message, '');
            this.router.navigateByUrl('/pages/reset-password');

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
            }
        });
    }


    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            type: []
    });
        this.f.type.setValue(1);

    }
}
