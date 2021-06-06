import { Component, OnInit } from '@angular/core';
import {HomeAboutModel, PartnerModel} from "../../../../../models/home.model";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {AddPartnerComponent} from "../../dialog/add-partner/add-partner.component";
import {AddContentComponent} from "../../dialog/add-content/add-content.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.scss']
})
export class HomeAboutComponent implements OnInit {

    dataSource: any;
    displayedColumns: string[] = ['title' , 'decs' , 'action' ];
    about: HomeAboutModel[] = [];

    constructor(private restService: DataService,
                private toastr: ToastrService,
                private dialog: MatDialog) {
    }

    openAddDialog(){
        let dialog = this.dialog.open(AddContentComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });

    }

    editDialog(data: HomeAboutModel){
        let dialog = this.dialog.open(AddContentComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    confirm(data: HomeAboutModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this data ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteHomeAbout(data);

                }
            });
    }

    deleteHomeAbout(data: HomeAboutModel) {
        this.restService.deleteHomeAbout(data._id).then((res) => {
            this.toastr.success('The Partner has been deleted successfully', '');
            this.about = this.about.filter(item => item._id !== data._id);
            this.dataSource = new MatTableDataSource(this.about);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getAbout() {
        this.restService.getHomeAbout().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
            this.about = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    ngOnInit() {
        this.getAbout();
    }



}
