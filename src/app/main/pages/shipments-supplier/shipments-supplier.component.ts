import { Component, OnInit } from '@angular/core';
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import * as jwt_decode from 'jwt-decode';
import {OrderModel} from "../../../../models/order.model";
import {OrderDetailsComponent} from "../dialog/order-details/order-details.component";
import {DriversDialogComponent} from "../dialog/drivers-dialog/drivers-dialog.component";

@Component({
  selector: 'app-shipments-supplier',
  templateUrl: './shipments-supplier.component.html',
  styleUrls: ['./shipments-supplier.component.scss']
})
export class ShipmentsSupplierComponent implements OnInit {
    dataSource: any;
    displayedColumns: string[];
    pageEvent: PageEvent;
    pagination = new PaginationModel();
    length: number;
    decoded: any;
    filterForm: FormGroup;
    page = 0;
    subtotal: number;


    constructor() {

    }

    get f() {
        return this.filterForm.controls;
    }



    ngOnInit() {

    }



}
