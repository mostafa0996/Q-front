import {Component, Input, OnInit} from '@angular/core';
import {ExportExcelService} from '../../../../services/export-excel.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {PaginationModel} from '../../../../models/pagination.model';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material';


@Component({
    selector: 'app-export-excel',
    templateUrl: './export-excel.component.html',
    styleUrls: ['./export-excel.component.scss'],
    providers: [DatePipe]

})
export class ExportExcelComponent implements OnInit {
    @Input() type;
    @Input() pagination;
    dataForExcel = [];
    paginationUser = new PaginationModel();
    fileName: string;
    date = new Date();
    dataSource: any;


    constructor(public exportService: ExportExcelService,
                private restService: DataService,
                private datePipe: DatePipe,
                private toastr: ToastrService) {
        this.paginationUser.page = 0;
        this.paginationUser.limit = 1000000000;
        this.paginationUser.keyword = '';


    }


    exportProccess() {
        if (this.type === 'normal') {
            this.fileName = 'Normal User';
            this.paginationUser.role = 'user';
            this.getUsers();
        } else if (this.type === 'ecommerce') {
            this.fileName = 'E_commerce Companies';
            this.paginationUser.role = 'ecommerce';
            this.getUsers();

        } else if (this.type === 'company') {
            this.fileName = 'Couriers Companies';
            this.paginationUser.role = 'company';
            this.getUsers();
        } else if (this.type === 'contact-us') {
            this.fileName = 'Contact us website';
            this.pagination.page = 0;
            this.pagination.limit = 1000000000;
            this.getContacts();
        } else if (this.type === 'subscribe') {
            this.fileName = 'Subscribe';
            this.pagination.page = 0;
            this.pagination.limit = 1000000000;
            this.getScubscritopne();
        } else if (this.type === 'feedback') {
            this.fileName = 'Contact us landing page';
            this.pagination.page = 0;
            this.pagination.limit = 1000000000;
            this.getFeedbacks();

        } else {
            this.fileName = 'Orders';
            this.pagination.page = 0;
            this.pagination.limit = 1000000000;
            this.getOrders();
        }

    }


    exportToExcel(data) {
        this.dataForExcel = [];
        const date = this.datePipe.transform(this.date, 'dd-MM-yyyy');

        data.forEach((row: any) => {
            this.dataForExcel.push(Object.values(row));
        });


        const reportData = {
            title: 'DeliverQ - ' + this.fileName + ' Report - ' + date,
            data: this.dataForExcel,
            headers: Object.keys(data[0])
        };


        this.exportService.exportExcel(reportData, date);
    }

    getUsers() {
        // tslint:disable-next-line:prefer-const

        this.restService.getReportUsers(this.paginationUser).then((res) => {
            const users: any[] = [];
            if (this.type === 'normal') {
                res.results.forEach(item => {
                    users.push({
                        'FIRST NAME': item.first_name,
                        'LAST NAME': item.last_name,
                        'EMAIL': item.email,
                        'PHONE': item.phone,
                        'TOTAL ORDERS': item.shipments
                    });
                });
                this.exportToExcel(users);

            } else if (this.type === 'ecommerce') {
                res.results.forEach(item => {
                    users.push({
                        'FIRST NAME': item.first_name,
                        'LAST NAME': item.last_name,
                        'COMPANY': item.company_name,
                        'EMAIL': item.email,
                        'PHONE': item.phone,
                        'TOTAL DELIVERED ORDERS': item.shipments
                    });
                });
                this.exportToExcel(users);


            } else if (this.type === 'company') {
                res.results.forEach(item => {
                    users.push({
                        'FIRST NAME': item.first_name,
                        'LAST NAME': item.last_name,
                        'COMPANY': item.company_name,
                        'EMAIL': item.email,
                        'PHONE': item.phone,
                        'TOTAL ORDERS': item.shipments
                    });
                });

                this.exportToExcel(users);

            }


        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getOrders() {

        this.restService.getShipments(this.pagination).then((res) => {
            const orders: any[] = [];
            res.results.forEach(item => {
                let status;
                if (item.status === 0) {
                    status = 'Pending';
                } else if (item.status === 1) {
                    status = 'Dispatched';
                } else if (item.status === 2) {
                    status = 'On Way';
                } else if (item.status === 3) {
                    status = 'Delivered';
                }
                const orderDate = this.datePipe.transform(item.createdAt, 'dd-MM-yyyy hh:mm a');
                let courier = item.companyObj ? item.companyObj.company_name : '-';
                let Driver = item.driverObj ? item.subCategoryObj.categoryObj.title_en : '-';
                orders.push({
                    'ID': item.tag,
                    'Courier': courier,
                    'Driver': Driver,
                    'Category': item.subCategoryObj.categoryObj.title_en,
                    'Delivery Way': item.typeObj.title_en + '(' + item.typeObj.price + ')',
                    'Cost': item.cost,
                    'Total': item.typeObj.price + item.cost,
                    'Status': status,
                    'Order Timing': orderDate,
                });

            });
            console.log(orders);
            this.exportToExcel(orders);

        }).catch((err: HttpErrorResponse) => {

        });
    }


    getContacts() {
        this.restService.getContacts(this.pagination).then((res) => {
            const contact: any[] = [];
            res.results.forEach(item => {
                let type;
                if (item.type === 1) {
                    type = 'Company';
                } else if (item.type === 2) {
                    type = 'Individual';
                } else if (item.type === 3) {
                    type = 'Normal';
                }
                const orderDate = this.datePipe.transform(item.createdAt, 'dd-MM-yyyy hh:mm a');
                contact.push({
                    'Name': item.name,
                    'Email': item.email,
                    'Phone': item.phone,
                    'Message': item.details,
                    'Type': type,
                    'Date': orderDate,
                });

            });
            this.exportToExcel(contact);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getScubscritopne() {
        this.restService.getScubscritopne(this.pagination).then((res) => {
            const contact: any[] = [];
            res.results.forEach(item => {
                contact.push({
                    'Email': item.email,
                });
            });
            this.exportToExcel(contact);


        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getFeedbacks() {
        this.restService.getFeedbacks(this.pagination).then((res) => {
            const contact: any[] = [];
            res.results.forEach(item => {
                let type;
                if (item.type === 1) {
                    type = 'Courier';
                } else if (item.type === 2) {
                    type = 'E_Commerce';
                } else if (item.type === 3) {
                    type = 'Customer';
                }
                const orderDate = this.datePipe.transform(item.createdAt, 'dd-MM-yyyy hh:mm a');
                contact.push({
                    'Name': item.name,
                    'Company': item.companyname,
                    'Email': item.email,
                    'Phone': item.phone,
                    'City': item.cityObj.title_en,
                    'Number of vehicles': item.numberofvehicles,
                    'Orders per day': item.ordersperday,
                    'Type': type,
                });

            });
            this.exportToExcel(contact);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    ngOnInit() {

    }

}
