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
import {OrdersComponent} from "./orders.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {AuthGuard} from "../../../../guard/auth.guard";
import { ShipmentCompleteComponent } from './shipment-complete/shipment-complete.component';
import { ShipmentTransitComponent } from './shipment-transit/shipment-transit.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ExportExcelModule} from "../export-excel/export-excel.module";
const routes = [
    {
        path     : 'orders/:id',
        component: OrdersComponent,
        canActivate: [AuthGuard],

    },
    {
        path     : 'orders/:id/:userid',
        component: OrdersComponent,
        canActivate: [AuthGuard],

    },
];


@NgModule({
    declarations: [OrdersComponent, ShipmentCompleteComponent, ShipmentTransitComponent],
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
        MatDatepickerModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatTabsModule,
        ExportExcelModule
    ]
})
export class OrdersModule { }
