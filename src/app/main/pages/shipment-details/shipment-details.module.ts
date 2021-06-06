import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShipmentDetailsComponent} from "./shipment-details.component";
import {AuthGuard} from "../../../../guard/auth.guard";
import {RouterModule} from "@angular/router";
import {NgxTimerModule} from "ngx-timer";


const routes = [
    {
        path: 'shipment-details/:id/:date',
        component: ShipmentDetailsComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
    declarations: [ShipmentDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CommonModule,
        NgxTimerModule

    ]
})
export class ShipmentDetailsModule {
}
