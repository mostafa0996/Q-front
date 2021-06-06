import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {EditTypeComponent} from "../dialog/edit-type/edit-type.component";
import {SubCategoryModel} from "../../../../models/SubCateoryModel";
import {EditSubCategoryComponent} from "../dialog/edite-sub-category/edit-sub-category.component";

@Component({
    selector: 'app-sub-categories',
    templateUrl: './sub-categories.component.html',
    styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

    displayedColumns: string[] = [ 'name_en', 'name_ar', 'category', 'image' , 'status', 'action'];
    dataSource: any;
    page = 0;
    subCategories: SubCategoryModel[] = [];
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


    updateSubCategory(data: SubCategoryModel, value) {
        data.active = value;
        this.restService.updateSubCategory(data).then((res) => {
            this.toastr.success('The Sub Category has been updated successfully', '');

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getSubCategories() {
        this.restService.getSubCategories().then((res) => {
            this.subCategories = res.results;
            this.dataSource = new MatTableDataSource(this.subCategories);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    openEditDialog(data: SubCategoryModel) {
        let dialog = this.dialog.open(EditSubCategoryComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditSubCategoryComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getSubCategories();
    }

}
