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
import {HttpErrorResponse} from "@angular/common/http";
import * as jwt_decode from 'jwt-decode';
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {


    dataSource: any;
    displayedColumns: string[];
    pageEvent: PageEvent;
    pagination = new PaginationModel();
    length: number;
    decoded: any;
    filterForm: FormGroup;
    page = 0;


    constructor(private restService: DataService,
                private fb: FormBuilder,
                private platform: Platform,
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




    getOrders() {
        if (this.pageEvent) {
            this.page = this.pageEvent.pageIndex;
        }
        this.pagination.page = this.page;

        this.restService.getShipments(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.dataSource = new MatTableDataSource(res.results);

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
        this.pagination.status = 3;
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
