import { Component, OnInit } from '@angular/core';
import {ContactModel} from "../../../../models/contact.model";
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {FeedbackModel} from "../../../../models/user.model";
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contcat-us',
  templateUrl: './contcat-us.component.html',
  styleUrls: ['./contcat-us.component.scss'],
  providers: [DatePipe]
})
export class ContcatUsComponent implements OnInit {

    displayedColumns: string[] = [ 'title',  'email', 'phone', 'details' , 'type' , 'date'];
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

    get f() {
        return this.filterForm.controls;
    }
    prepareForm() {
        this.filterForm = this.fb.group({
            startDate: [''],
            endDate: [''],
        });
    }
    applyFilter() {
        
        this.f.startDate.value ? this.pagination.startDate = this.datePipe.transform(this.f.startDate.value, 'yyyy-MM-dd'): null;
        this.f.endDate.value ? this.pagination.endDate = this.datePipe.transform(this.f.endDate.value, 'yyyy-MM-dd'): null;
        this.getFeedbacks();
    }



    getFeedbacks() {
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
            this.pagination.limit = this.pageEvent.pageSize;
        }
        this.restService.getContacts(this.pagination).then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
            this.length = res.totalResults;

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    ngOnInit() {
        this.getFeedbacks();
        this.prepareForm();
    }
    sort(e){
        this.pagination.sortBy = e.active;
        this.pagination.sortValue = e.direction;
        this.getFeedbacks();
    }


}
