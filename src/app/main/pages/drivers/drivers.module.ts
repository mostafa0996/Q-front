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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {DriversComponent} from "./drivers.component";

const routes = [
    {
        path     : 'drivers',
        component: DriversComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
    declarations: [DriversComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule ,
        FuseSharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatSelectModule
    ]
})

export class DriversModule { }
