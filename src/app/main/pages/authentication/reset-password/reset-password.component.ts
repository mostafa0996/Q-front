import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {UserModel} from "../../../../../models/user.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private  restService: DataService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    get f() {
        return this.resetPasswordForm.controls;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.resetPasswordForm = this._formBuilder.group({
            otp: ['', [Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator, Validators.minLength(8), Validators.maxLength(16)]],
            email: ['']
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let userModel: UserModel = this.resetPasswordForm.value as UserModel;
        userModel.phone = localStorage.getItem('phone');

        this.restService.resetPassword(userModel).then((res) => {
            this.toastr.success(res.message, '');
            setTimeout(() => {
                this.router.navigateByUrl('/pages/login');
            });

            localStorage.setItem('auth_deliver_admin', res.token);

        }).catch((err: HttpErrorResponse) => {
            this.toastr.error(err.error.message, '');

        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('new_password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return {passwordsNotMatching: true};
};
