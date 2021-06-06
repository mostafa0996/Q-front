import { Component, OnInit } from '@angular/core';
import {CounterModel, PartnerModel} from "../../../../../models/home.model";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {AddPartnerComponent} from "../../dialog/add-partner/add-partner.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

    dataSource: any;
    displayedColumns: string[] = [ 'image' , 'action'];
    partners: PartnerModel[] = [];

    constructor(private restService: DataService,
                private toastr: ToastrService,
                private dialog: MatDialog) {
    }

    openAddDialog(){
        let dialog = this.dialog.open(AddPartnerComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });

    }

    editDialog(data: PartnerModel){
        let dialog = this.dialog.open(AddPartnerComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    confirm(data: PartnerModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this partner ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deletePartner(data);

                }
            });
    }

    deletePartner(data: PartnerModel) {
        this.restService.deletePartner(data._id).then((res) => {
            this.toastr.success('The Partner has been deleted successfully', '');
            this.partners = this.partners.filter(item => item._id !== data._id);
            this.dataSource = new MatTableDataSource(this.partners);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    getPartners() {
        this.restService.getPartners().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
            this.partners = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    ngOnInit() {
        this.getPartners();
    }


}
