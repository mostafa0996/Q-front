import {Component, ViewEncapsulation} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {fuseAnimations} from '@fuse/animations';
import {AppService} from "../../../app.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent {
    decoded: any;

    /**
     * Constructor
     */
    constructor(public appService: AppService) {
         this.decoded = jwt_decode(localStorage.getItem('auth_deliver_admin'));

    }
}
