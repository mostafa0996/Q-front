import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../../services/data.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { CostModel } from "../../../../models/cost.model";
import { HttpErrorResponse } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { BannerModel } from "../../../../models/banner.model";
import { EditBannerComponent } from "../dialog/edit-banner/edit-banner.component";
import { EditCostComponent } from "../dialog/edit-cost/edit-cost.component";
import { filter } from 'lodash';

@Component({
    selector: 'app-costs',
    templateUrl: './costs.component.html',
    styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit {


    displayedColumns: string[] = ['from', 'to', 'category', 'cost', 'action'];
    dataSource: any;
    page = 0;
    length: number;
    id: number;


    constructor(public restService: DataService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private toastr: ToastrService) {

    }


    applyFilter(filterValue: string) {
        // this.dataSource.filter = filterValue.trim().toLowerCase();
        if(filterValue == ''){
            this.getCosts()
        }
        const data = this.dataSource.filteredData.filter(ele => {
            return ele.cost.includes(filterValue.trim()) ||
                ele.fromObj.title_en.includes(filterValue.trim()) ||
                ele.toObj.title_en.includes(filterValue.trim()) ||
                ele.categoryObj.title_en.includes(filterValue.trim())
        });
        this.dataSource = new MatTableDataSource(data)
    }



    getCosts() {
        this.restService.getCosts().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    removeCost(data: CostModel) {
        // tslint:disable-next-line:prefer-const
        this.restService.removeCost(data._id).then((res) => {
            this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item._id != data._id);
            this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            Swal.fire(
                'Delete',
                'The cost has been deleted successfully',
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

    confirmeRemove(item: CostModel) {
        let status: string;

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this cost ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.removeCost(item);

                }
            });
    }

    openEditDialog(data: CostModel) {
        let dialog = this.dialog.open(EditCostComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    openAddDialog() {
        let dialog = this.dialog.open(EditCostComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getCosts();
    }

}
