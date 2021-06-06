import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../../../../../models/user.model";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../../services/data.service";
import {AppService} from "../../../../app.service";
import {ToastrService} from "ngx-toastr";
import {PaginationModel} from "../../../../../models/pagination.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-courier-dialog',
  templateUrl: './courier-dialog.component.html',
  styleUrls: ['./courier-dialog.component.scss']
})
export class CourierDialogComponent implements OnInit {
    shipment: string;
    displayedColumns: string[] = [ 'company', 'owner'  , 'city' , 'action'];
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
                public dialogRef: MatDialogRef<CourierDialogComponent>,
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
        }
        this.restService.getUsers(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.users = res.results.filter(item => item.active === 1);
            this.dataSource = new MatTableDataSource(this.users);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    assign(data: UserModel){
        this.pagination.shipment = this.shipment;
        this.pagination.company = data._id;
        this.restService.assignCompany(this.pagination).then((res) => {
            this.toastr.success('success' , '');
            this.dialogRef.close(res);

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

}
