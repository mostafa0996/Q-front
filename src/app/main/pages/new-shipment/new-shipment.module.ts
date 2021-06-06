import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from "../../../../guard/auth.guard";
import {NewShipmentComponent} from "./new-shipment.component";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AgmCoreModule} from "@agm/core";
import {MatRadioModule} from "@angular/material/radio";

const routes = [
    {
        path: 'new-shipment',
        component: NewShipmentComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
    declarations: [NewShipmentComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
            libraries: ['places']
        }),
        MatIconModule,
        MatRadioModule
    ]
})
export class NewShipmentModule {
}
