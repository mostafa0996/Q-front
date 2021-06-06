import {Component, OnInit} from '@angular/core';
import {LogModel} from "../../../../../models/order.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
    data: LogModel[];
    displayedColumns: string[] = ['index', 'company', 'response'];
    dataSource: any;


    constructor() {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.data);
    }

}
