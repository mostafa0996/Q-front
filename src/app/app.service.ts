import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import * as jwt_decode from 'jwt-decode';
import {environment} from "../environments/environment";



@Injectable({
    providedIn: 'root'
})
export class AppService {
     urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

    public email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    public language = new BehaviorSubject<string>(null);
    public isUserLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public isActive: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public image: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public imageProfile: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public isPermissionProject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



    active = 1;
    decoded: any;
    public loading = false;
    currentLanguage: string;
    fileUrl = environment.baseUrlFile;

    constructor(private translate: TranslateService) {
        /** Language Configurations **/
        if (!localStorage.getItem('language')) {
            localStorage.setItem('language', 'en');
        }
        if (localStorage.getItem('auth_deliver_admin')) {
            let authToken = localStorage.getItem('auth_deliver_admin') ? localStorage.getItem('auth_deliver_admin') : '';
            if(authToken){
                this.decoded = jwt_decode(authToken);

            }

        }

        if (localStorage.getItem('profile')) {
            let profile = localStorage.getItem('profile');
            this.imageProfile.next(profile);
        }
        const browserLang = localStorage.getItem('language');
        translate.setDefaultLang(browserLang.match(/en|ar/) ? browserLang : 'en');
        this.language.next(browserLang);


        const token = localStorage.getItem('auth_deliver_admin');
        this.isUserLoggedIn.next(token);
        const active = localStorage.getItem('active');
        this.isActive.next(active);
    }


    /* Switch Language */
    switchLanguage(language: string) {
        localStorage.setItem('language', language);
        this.translate.use(language);
        this.language.next(language);
    }

}
