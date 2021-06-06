import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExportExcelComponent} from "./export-excel.component";

@NgModule({
    declarations: [ExportExcelComponent],
    exports: [
        ExportExcelComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ExportExcelModule { }
