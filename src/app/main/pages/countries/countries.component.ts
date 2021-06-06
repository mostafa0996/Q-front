import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {CityModel} from "../../../../models/city";
import {EditCountryComponent} from "../dialog/edit-country/edit-country.component";
import {CounterModel} from "../../../../models/home.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {


    displayedColumns: string[] = ['_id', 'name_en', 'name_ar' , 'status', 'action'];
    dataSource: any;
    page = 0;
    length: number;
    id: number;
    cities: CityModel[];

    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    confirm(data: CityModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this city ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteCity(data);

                }
            });
    }

    deleteCity(data: CityModel){
        this.restService.deleteCity(data._id).then((res) => {
            this.toastr.success('The city has been deleted successfully', '');
            this.cities = this.dataSource.filteredData.filter(item => item._id !== data._id);
            this.dataSource = new MatTableDataSource(this.cities);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    updateCountry(city: CityModel, value) {
        // tslint:disable-next-line:prefer-const
        city.active = value;
        this.restService.updateCity(city).then((res) => {
            this.toastr.success('The city has been updated successfully', '');

        }).catch((err: HttpErrorResponse) => {
            this.toastr.error(err.error.message, '');

            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getCities() {
        this.restService.getCities().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    openEditDialog(data: CityModel) {
        let dialog = this.dialog.open(EditCountryComponent);
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
        let dialog = this.dialog.open(EditCountryComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getCities();
    }


}
