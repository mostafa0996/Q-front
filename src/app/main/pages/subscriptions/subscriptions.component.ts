import { Component, OnInit } from '@angular/core';
import {FeedbackModel} from "../../../../models/user.model";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  providers: [DatePipe]
})
export class SubscriptionsComponent implements OnInit {


    displayedColumns: string[] = ['id', 'email','date'];
    dataSource: any;
    page = 0;
    categories: FeedbackModel[] = [];
    length: number;
    id: number;
    pagination = new PaginationModel();
    pageEvent: PageEvent;
    filterForm: FormGroup;


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService,
                private fb: FormBuilder,
                private datePipe: DatePipe) {
        this.pagination.page = 0 ;
        this.pagination.limit = 20 ;
    }


    applyFilter() {
        
        this.f.startDate.value ? this.pagination.startDate = this.datePipe.transform(this.f.startDate.value, 'yyyy-MM-dd'): null;
        this.f.endDate.value ? this.pagination.endDate = this.datePipe.transform(this.f.endDate.value, 'yyyy-MM-dd'): null;
        this.getScubscritopne();
    }




    getScubscritopne() {
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
            this.pagination.limit = this.pageEvent.pageSize;
        }
        this.restService.getScubscritopne(this.pagination).then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
            this.length = res.totalResults;

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }
    get f() {
        return this.filterForm.controls;
    }
    prepareForm() {
        this.filterForm = this.fb.group({
            startDate: [''],
            endDate: [''],
        });
    }
    ngOnInit() {
        this.getScubscritopne();
        this.prepareForm();
    }
    sort(e){
        this.pagination.sortBy = e.active;
        this.pagination.sortValue = e.direction;
        this.getScubscritopne();
    }


}
