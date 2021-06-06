import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../../../../models/order.model";
import {PaginationModel} from "../../../../../models/pagination.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    data: OrderModel;
    dataSource: any;
    decoded: any;
    pagination = new PaginationModel();
    constructor(
                public dialogRef: MatDialogRef<OrderDetailsComponent>,
    ) {
    }



    ngOnInit() {

    }

}
