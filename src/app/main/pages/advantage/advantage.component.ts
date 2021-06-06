import { Component, OnInit } from '@angular/core';
import {AdvantageModel} from "../../../../models/advantage.model";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {EditAdvantageComponent} from "../dialog/edit-advantage/edit-advantage.component";
import {BannerModel} from "../../../../models/banner.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-advantage',
  templateUrl: './advantage.component.html',
  styleUrls: ['./advantage.component.scss']
})
export class AdvantageComponent implements OnInit {

    displayedColumns: string[] = ['title_en', 'description_en',  'image' , 'action'];
    dataSource: any;
    page = 0;
    advantages: AdvantageModel[] = [];
    length: number;
    id: number;


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }





    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }



    getAdvantage() {
        this.restService.getAdvantage().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        })
    }


    deleteAdvantage(data: AdvantageModel) {
        // tslint:disable-next-line:prefer-const
        this.restService.deleteAdvantage(data._id).then((res) => {
            this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item._id != data._id);
            this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            Swal.fire(
                'Delete',
                'The advantage has been deleted successfully',
                'success'
            )
        }).catch((err: HttpErrorResponse) => {

        });
    }


    confirmeRemove(item: AdvantageModel) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this advantage ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteAdvantage(item);

                }
            });
    }




    openEditDialog(type: AdvantageModel) {
        let dialog = this.dialog.open(EditAdvantageComponent);
        dialog.componentInstance.data = type;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(type);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditAdvantageComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getAdvantage();
    }

}
