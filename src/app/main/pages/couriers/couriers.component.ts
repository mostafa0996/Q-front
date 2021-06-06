import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../../../../models/user.model";
import {PaginationModel} from "../../../../models/pagination.model";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.scss']
})
export class CouriersComponent implements OnInit {


    displayedColumns: string[] = [ 'title', 'owner'  , 'city', 'status' , 'action'];
    dataSource: any;
    page = 0;
    suppliers: UserModel[] = [];
    pageEvent: PageEvent;
    length: number;
    id: number;
    users: UserModel[] = [];
    filterForm: FormGroup;
    pagination = new PaginationModel();

    constructor(private restService: DataService,
                private fb: FormBuilder,
                private appService: AppService,
                private toastr: ToastrService) {
        this.pagination.page = 0 ;
        this.pagination.limit = 20 ;
        this.pagination.role = 'company' ;
    }

    get f() {
        return this.filterForm.controls;
    }



    getSuppliers() {
        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
            this.pagination.limit = this.pageEvent.pageSize;
        }
        this.restService.getUsers(this.pagination).then((res) => {
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



    prepareForm() {
        this.filterForm = this.fb.group({
            keyword: [''],
            mina_category_id: [''],
            active: [''],
        });
    }


    confirmeApprove(user: UserModel , value) {
        let status;
        if (value === 1) {
            status = 'approval';
        } else {
            status = 'reject';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to send ' + status + ' to this courier ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(user , value);

                }
            });
    }

    activeBlock(user: UserModel , value) {
        // tslint:disable-next-line:prefer-const
        let data;
        user.active = value;
        user.user = user._id;
        if (value === 1) {
            data = 'active';
        } else {
            data = 'reject';
        }
        this.restService.activeSupplier(user).then((res) => {
            Swal.fire(
                'Update!',
                'This courier is ' + data + ' now',
                'success'
            );

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }




    search(value) {
        if(value){
            this.pagination.keyword = value ;

        }else{
            this.pagination.keyword = '' ;

        }
        this.pagination.page = 0 ;
        this.pagination.keyword = value ;
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getSuppliers();

    }

    ngOnInit() {
        this.pagination.keyword = '' ;
        this.getSuppliers();
    }
    sort(e){
        this.pagination.sortBy = e.active;
        this.pagination.sortValue = e.direction;
        this.getSuppliers();
    }


}
