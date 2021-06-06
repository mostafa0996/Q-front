import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersComponent} from "./users.component";
import {MatSelectModule} from "@angular/material/select";
import {AuthGuard} from "../../../../guard/auth.guard";
import {ServiceProvidersComponent} from './service-providers/service-providers.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NormalUserComponent} from "./normal-user/normal-user.component";
import {AdminsComponent} from "./admins/admins.component";
import { EcommerceUserComponent } from './ecommerce-user/ecommerce-user.component';
import {ExportExcelModule} from "../export-excel/export-excel.module";


const routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],

    }
];

@NgModule({
    declarations: [UsersComponent, ServiceProvidersComponent, NormalUserComponent , AdminsComponent, EcommerceUserComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatSelectModule,
        ExportExcelModule,

    ]
})
export class UsersModule {
}
