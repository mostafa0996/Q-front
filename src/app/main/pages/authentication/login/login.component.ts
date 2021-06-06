import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {UserModel} from "../../../../../models/user.model";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import * as jwt_decode from 'jwt-decode';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private fb: FormBuilder,
        private appService: AppService,
        private restService: DataService,
        private toastr: ToastrService,
        private router: Router
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let userModel: UserModel = this.loginForm.value as UserModel;
        this.restService.login(userModel).then((res) => {
            if(res.user.role == 'admin' || res.user.role == 'company' || res.user.role == 'master' || res.user.role == 'ecommerce'){
                let url = localStorage.getItem('url');
                if(url){
                    this.router.navigate([url]);
                    localStorage.removeItem('url');

                }else{
                    this.router.navigateByUrl('/home');
                }
                localStorage.setItem('auth_deliver_admin', res.tokens.access.token);
                localStorage.setItem('auth_deliver_admin_refresh', res.tokens.refresh.token);
                this.appService.decoded = jwt_decode(res.tokens.access.token.sub);

            }
        }).catch((err: HttpErrorResponse) => {
                 if(err){
                     this.toastr.error(err.error.message , '')

                 }
            if(err.error == 401){

                // this.toastr.error(err.error.message , '')
            }

        });
    }

    prepareForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
        });
    }

    ngOnInit(): void {
        this.prepareForm();

    }
}
