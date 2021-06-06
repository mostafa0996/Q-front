import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../../../../services/data.service';
import {AppService} from '../../../../app.service';
import {ToastrService} from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import * as jwt_decode from 'jwt-decode';
import {OrderModel} from '../../../../../models/order.model';
import {OrderDetailsComponent} from '../../dialog/order-details/order-details.component';
import {ActivatedRoute} from '@angular/router';
import {PaginationModel} from '../../../../../models/pagination.model';
import {DatePipe} from '@angular/common';
import {LogsComponent} from '../../dialog/logs/logs.component';
import {CourierDialogComponent} from '../../dialog/courier-dialog/courier-dialog.component';

@Component({
    selector: 'app-shipment-transit',
    templateUrl: './shipment-transit.component.html',
    styleUrls: ['./shipment-transit.component.scss'],
    providers: [DatePipe]
})
export class ShipmentTransitComponent implements OnInit {

    dataSource: any;
    displayedColumns: string[];
    pageEvent: PageEvent;
    pagination = new PaginationModel();

    length: number;
    decoded: any;
    filterForm: FormGroup;
    page = 0;
    subtotal: number;
    shipments: OrderModel[] = [];
    pagesList: number[] = [];


    constructor(private restService: DataService,
                private fb: FormBuilder,
                private appService: AppService,
                private dilaog: MatDialog,
                private routerActivate: ActivatedRoute,
                private datePipe: DatePipe,
                private toastr: ToastrService) {
        this.pagination.page = 0;
    }

    get f() {
        return this.filterForm.controls;
    }


    applyFilter() {
        if (this.f.status.value === '') {
            this.f.status.setValue(-1);
        }

        this.pagination.startDate = this.datePipe.transform(this.f.startDate.value, 'yyyy-MM-dd');
        this.pagination.endDate = this.datePipe.transform(this.f.endDate.value, 'yyyy-MM-dd');
        this.pagination.status = this.f.status.value;
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

    openDialogLogs(data: OrderModel) {
        let dialog = this.dilaog.open(LogsComponent);
        dialog.componentInstance.data = data.shipmentslogs;
    }

    openDialogCompanies(data: OrderModel) {
        let dialog = this.dilaog.open(CourierDialogComponent);
        dialog.componentInstance.shipment = data._id;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    getOrders() {
        
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
            this.pagination.limit = this.pageEvent.pageSize;
        }
        console.log(this.pagination)
        this.restService.getShipments(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.shipments = [];
            res.results.forEach(item => {
                if (item.status <= 2) {
                    this.shipments.push(item);
                }
            });

            if (this.pagination.page == 0) {
                this.pagesList = [];
                let i = 0;
                for (i; i <= res.totalPages - 1; i++) {
                    this.pagesList.push(i);
                }
            }

            this.dataSource = new MatTableDataSource(this.shipments);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getOrederByPage(index) {

        if (index > 0) {
            this.pagination.page = index;
        } else {
            this.pagination.page = index;
        }

        this.getOrders();
        window.scroll(0,0);


    }


    prepareForm() {
        this.filterForm = this.fb.group({
            status: [''],
            startDate: [''],
            endDate: [''],
        });
    }


    ngOnInit() {
        this.pagination.limit = 20;
        this.pagination.page = 0;
        this.pagination.status = -1;
        this.pagination.tag = '';
        this.pagination.assignedStatus = -1;


        this.decoded = jwt_decode(localStorage.getItem('auth_deliver_admin'));
        this.prepareForm();
        this.displayedColumns = ['id', 'user' , 'Supplier', 'Assigned', 'category', 'type', 'cost', 'total', 'status', 'date', 'action'];
        this.routerActivate.params.subscribe(params => {
            if (params.id == 0) {
                this.pagination.company = '';

                this.pagination.startDate = '';
                this.pagination.endDate = '';

            } else {
                this.pagination.company = params.id;

            }
            
            params.userid ? this.pagination.user = params.userid: this.pagination.user = '';
           
            console.log(params)
        });
        
        this.getOrders();

    }
    sort(e){
        this.pagination.sortBy = e.active;
        this.pagination.sortValue = e.direction;
        this.getOrders();
    }

}
