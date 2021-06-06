import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {BannerComponent} from "./banner.component";
import {AuthGuard} from "../../../../guard/auth.guard";


const routes = [
    {
        path     : 'banners',
        component: BannerComponent,
        canActivate: [AuthGuard],

    }
];

@NgModule({
    declarations: [BannerComponent],
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
        MatOptionModule,
        MatAutocompleteModule,

    ]
})

export class BannerModule { }
