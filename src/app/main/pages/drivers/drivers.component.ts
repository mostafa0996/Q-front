import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {UserModel} from "../../../../models/user.model";
import Swal from "sweetalert2";
import {Category} from "../../../../models/category";
import {EditCategoryComponent} from "../dialog/edit-category/edit-category.component";
import {EditDriverComponent} from "../dialog/edit-driver/edit-driver.component";
import {MatDialog} from "@angular/material/dialog";
import {EditAdvantageComponent} from "../dialog/edit-advantage/edit-advantage.component";
import * as jwt_decode from 'jwt-decode';
import {Platform} from "@angular/cdk/platform";
import {OrdersDriverComponent} from "../dialog/orders-driver/orders-driver.component";


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
    pagination = new PaginationModel();
    displayedColumns: string[] ;
    dataSource: any;
    pageEvent: PageEvent;
    users: UserModel[];
    length: number;

    constructor(private restService: DataService,
                private toastr: ToastrService ,
                private platform: Platform,
                private dialog: MatDialog) {
        this.pagination.page = 0 ;
        this.pagination.limit = 20 ;
        this.pagination.role = 'driver' ;
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


    applyFilter(value: string) {
        if (value) {
            this.pagination.keyword = value;

        } else {
            this.pagination.keyword = '';

        }
        this.pagination.page = 0;
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getUsers();
    }


    activeBlock(data: UserModel, status) {
        // tslint:disable-next-line:prefer-const
        data.active = status;
        this.restService.activeSupplier(data).then((res) => {
                let index = this.users.findIndex(item => item._id === data._id);
                this.users[index].active = status;
                this.dataSource = new MatTableDataSource(this.users);

                Swal.fire(
                    'Update!',
                    'The driver status has been updated.',
                    'success'
                );

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    openEditDialog(user: UserModel) {
        let dialog = this.dialog.open(EditDriverComponent);
        dialog.componentInstance.data = user;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(user);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openOrdersDialog(id) {
        let dialog = this.dialog.open(OrdersDriverComponent);
        dialog.componentInstance.id = id;
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditDriverComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }



    confirmeActiveBlock(item, status) {
        let statusName: string;
        if (status == 1) {
            statusName = 'active';
        } else if (status == 0) {
            statusName = 'unactive';
        } else if (status == 2) {
            statusName = 'block';
        } else {
            statusName = 'active';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + statusName + ' this driver ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + statusName + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(item, status);

                }
            });
    }


    deleteAccount(user: UserModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteUserConfirm(user);

                }
            });
    }

    deleteUserConfirm(user){
        this.restService.deleteUser(user._id).then((res) => {
            this.toastr.success('The account has been deleted successfully', '');
            this.users = this.users.filter(item => item._id != user._id);
            this.dataSource = new MatTableDataSource(this.users);


        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    ngOnInit() {
        this.pagination.company = jwt_decode(localStorage.getItem('auth_deliver_admin')).sub;
        this.pagination.keyword = '' ;

        this.getUsers();
        if(this.platform.ANDROID || this.platform.IOS){
            this.displayedColumns = [ 'first_name',  'active', 'action'];


        }else{
            this.displayedColumns =  [ 'first_name', 'last_name', 'email', 'phone' ,  'active', 'action'];

        }
  }

}
