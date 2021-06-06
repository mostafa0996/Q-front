import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../../../../guard/auth.guard";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {NewUserComponent} from "./new-user.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AgmCoreModule} from "@agm/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";

const routes = [
    {
        path     : 'new-user/:id',
        component: NewUserComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
    declarations: [NewUserComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule,
        AgmCoreModule,
        MatProgressBarModule
    ]
})


export class NewUserModule {

}
