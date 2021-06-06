import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {PaginationModel} from "../../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {UserModel} from "../../../../../models/user.model";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as jwt_decode from 'jwt-decode';
import {OrderModel} from "../../../../../models/order.model";
import {Platform} from "@angular/cdk/platform";

@Component({
    selector: 'app-drivers-dialog',
    templateUrl: './drivers-dialog.component.html',
    styleUrls: ['./drivers-dialog.component.scss']
})
export class DriversDialogComponent implements OnInit {
    pagination = new PaginationModel();
    dataSource: any;
    pageEvent: PageEvent;
    users: UserModel[];
    length: number;
    data: OrderModel;
    displayedColumns: string[];

    constructor(private restService: DataService,
                private toastr: ToastrService,
                private platform: Platform,
                public dialogRef: MatDialogRef<DriversDialogComponent>,
                private dialog: MatDialog) {
        this.pagination.page = 0;
        this.pagination.limit = 100000;
        this.pagination.role = 'driver';
    }

    getUsers() {
        // tslint:disable-next-line:prefer-const

        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
        }
        this.restService.getDrivers(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.dataSource = new MatTableDataSource(res.results);
            this.users = res.results;


        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    assignDriver(element) {
        this.pagination.shipment = this.data._id;
        this.pagination.driver = element._id;

        this.restService.assignDriver(this.pagination).then((res) => {
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    ngOnInit() {
        this.pagination.keyword = '';
        this.pagination.company = jwt_decode(localStorage.getItem('auth_deliver_admin')).sub;
        if(this.platform.ANDROID || this.platform.IOS){
            this.displayedColumns = ['name', 'action'];

        }else{
            this.displayedColumns = ['name', 'email', 'action'];

        }
        this.getUsers();
    }

}
