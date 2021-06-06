import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../../../../guard/auth.guard";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SubscriptionsComponent} from "./subscriptions.component";
import {ExportExcelModule} from '../export-excel/export-excel.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatSortModule } from '@angular/material/sort';

const routes = [
    {
        path     : 'subscriptions',
        component: SubscriptionsComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [SubscriptionsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        ExportExcelModule,
        MatSortModule
    ]
})
export class SubscriptionsModule { }
