import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {PaginationModel} from "../../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {UserModel} from "../../../../../models/user.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OrderDetailsComponent} from "../order-details/order-details.component";

@Component({
    selector: 'app-orders-driver',
    templateUrl: './orders-driver.component.html',
    styleUrls: ['./orders-driver.component.scss']
})
export class OrdersDriverComponent implements OnInit {
    id: string;

    pagination = new PaginationModel();
    dataSource: any;
    pageEvent: PageEvent;
    users: UserModel[];
    length: number;
    displayedColumns = [ 'tag',  'action'];


    constructor(private restService: DataService,
                private toastr: ToastrService ,
                private dialog: MatDialog,
                public dialogRef: MatDialogRef<OrdersDriverComponent>,
                ) {
    }

    getOrdersByDriver() {
        // tslint:disable-next-line:prefer-const

        this.restService.getOrdersByDriver(this.id).then((res) => {
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

    openOrderDetails(element){
        let dialog = this.dialog.open(OrderDetailsComponent);
        dialog.componentInstance.data = element;
    }


    ngOnInit() {
        this.getOrdersByDriver();
    }

}
