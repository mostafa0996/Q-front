import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {PaginationModel} from "../../../../../models/pagination.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../../services/data.service";
import {AppService} from "../../../../app.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {OrderModel} from "../../../../../models/order.model";
import {OrderDetailsComponent} from "../../dialog/order-details/order-details.component";
import {MatTableDataSource} from "@angular/material/table";
import {DriversDialogComponent} from "../../dialog/drivers-dialog/drivers-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import {Platform} from "@angular/cdk/platform";


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

    dataSource: any;
    displayedColumns: string[];
    pageEvent: PageEvent;
    pagination = new PaginationModel();
    length: number;
    decoded: any;
    filterForm: FormGroup;
    page = 0;
    subtotal: number;
    orders: OrderModel[] =[];

    constructor(private restService: DataService,
                private platform: Platform,
                private fb: FormBuilder,
                private appService: AppService,
                private dilaog: MatDialog,
                private toastr: ToastrService) {

    }

    get f() {
        return this.filterForm.controls;
    }


    applyFilter() {
        if (this.f.status.value === "") {
            this.f.status.setValue(-1);
        }

        this.pagination.status = this.f.status.value;
        this.pagination.assignedStatus = this.f.assignedStatus.value;
        this.pagination.page = 0;
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getOrders();

    }

    rejectAcceptShipment(element) {
        this.pagination.status = 4;
        this.pagination.shipment = element._id;
        this.pagination.user = element.user;

        this.restService.cancelShipment(this.pagination).then((res) => {
            this.toastr.success(res.message, '');
            this.orders = this.orders.filter(item => item._id !=  element._id);
            this.dataSource = new MatTableDataSource(this.orders);
        }).catch((err: HttpErrorResponse) => {

        });
    }


    openDialogOrder(data: OrderModel) {
        let dialog = this.dilaog.open(OrderDetailsComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index].status = result.status;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openDialogDriver(element) {
        let dialog = this.dilaog.open(DriversDialogComponent);
        dialog.componentInstance.data = element;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(element);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }




    getOrders() {
        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        this.pagination.page = this.page;

        this.restService.getShipments(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.dataSource = new MatTableDataSource(res.results);
            this.orders = res.results;

        }).catch((err: HttpErrorResponse) => {

        });
    }





    prepareForm() {
        this.filterForm = this.fb.group({
            status: [''],
            assignedStatus: [''],
        });
    }


    ngOnInit() {
        this.pagination.limit = 20;
        this.pagination.page = 0;
        this.pagination.status = 0;
        this.pagination.assignedStatus = -1;
        this.pagination.tag = '';
        this.decoded = jwt_decode(localStorage.getItem('auth_deliver_admin'));
        this.pagination.company = this.decoded.sub;
        this.prepareForm();
        this.getOrders();
        if(this.platform.ANDROID || this.platform.IOS){
            this.displayedColumns = ['id', 'status',  'action'];


        }else{
            this.displayedColumns = ['id', 'Assigned', 'category', 'type', 'cost', 'total', 'status', 'date', 'action'];

        }

    }



}
