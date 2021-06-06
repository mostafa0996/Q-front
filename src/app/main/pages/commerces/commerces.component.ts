import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../../../../models/user.model";
import {PaginationModel} from "../../../../models/pagination.model";


@Component({
  selector: 'app-commerces',
  templateUrl: './commerces.component.html',
  styleUrls: ['./commerces.component.scss']
})
export class CommercesComponent implements OnInit {


    displayedColumns: string[] = [ 'title', 'owner' , 'delivery', 'transit' , 'status' , 'action'];
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
        this.pagination.role = 'ecommerce' ;
    }

    get f() {
        return this.filterForm.controls;
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




    ngOnInit() {
        this.pagination.keyword = '';
        this.getSuppliers();
    }
    sort(e){
        this.pagination.sortBy = e.active;
        this.pagination.sortValue = e.direction;
        this.getSuppliers();
    }

}
