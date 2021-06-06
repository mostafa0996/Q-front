import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from 'models/order.model';
import { PaginationModel } from 'models/pagination.model';
import { DataService } from 'services/data.service';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
    dataSource: any;
    displayedColumns: string[];
    pageEvent: PageEvent;
    pagination = new PaginationModel();

    length: number;
    decoded: any;
    page = 0;
    subtotal: number;
    shipments: OrderModel[] = [];
    pagesList: number[] = [];


    constructor(private restService: DataService,
                private routerActivate: ActivatedRoute,) {
        this.pagination.page = 0;
    }



  
  
   

    getOrders() {
        
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
            this.pagination.limit = this.pageEvent.pageSize;
        }
        this.pagination.company = '';
        this.pagination.user = '';
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


  


    ngOnInit() {
        this.pagination.limit = 20;
        this.pagination.page = 0;
        this.pagination.status = -1;
        this.pagination.tag = '';
        this.pagination.assignedStatus = -1;


        this.decoded = jwt_decode(localStorage.getItem('auth_deliver_admin'));
        this.displayedColumns = ['title', 'company' , 'trackingId', 'date', 'deliveryType', 'deliveryCharge', 'status', 'details', ];
        // this.routerActivate.params.subscribe(params => {
        //     if (params.id == 0) {
        //         this.pagination.company = '';

        //         this.pagination.startDate = '';
        //         this.pagination.endDate = '';

        //     } else {
        //         this.pagination.company = params.id;

        //     }
            
        //     params.userid ? this.pagination.user = params.userid: this.pagination.user = '';
           
        //     console.log(params)
        // });
        
        this.getOrders();

    }
    sort(e){
        this.pagination.sortBy = e.active;
        this.pagination.sortValue = e.direction;
        this.getOrders();
    }

}

