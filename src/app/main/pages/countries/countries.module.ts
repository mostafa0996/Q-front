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
import {CountriesComponent} from "./countries.component";


const routes = [
    {
        path     : 'countries',
        component: CountriesComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [CountriesComponent],
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
        MatSelectModule
    ]
})


export class CountriesModule { }
