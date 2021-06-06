import { Component, OnInit } from '@angular/core';
import {BannerModel} from "../../../../models/banner.model";
import {DataService} from "../../../../services/data.service";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {EditBannerComponent} from "../dialog/edit-banner/edit-banner.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {


    displayedColumns: string[] = [ 'status',  'image' ,  'action'];
    dataSource: any;
    page = 0;
    banners: BannerModel[] = [];
    length: number;
    id: number;

    constructor(private restService: DataService,
                private appService: AppService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }



    getBanners() {
        this.restService.getBanners().then((res) => {
                this.dataSource = new MatTableDataSource(res.results);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditBannerComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openEditDialog(data: BannerModel){
        let dialog = this.dialog.open(EditBannerComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    removeBanner(data: BannerModel) {
        // tslint:disable-next-line:prefer-const
        this.restService.removeBanner(data._id).then((res) => {
                this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item._id != data._id);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
                Swal.fire(
                    'Delete',
                    'The banner has been deleted successfully',
                    'success'
                )
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    confirmeRemove(item: BannerModel) {
        let status: string;

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this banner ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.removeBanner(item);

                }
            });
    }



    ngOnInit() {
        this.getBanners();
    }

}
