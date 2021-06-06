import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {CounterModel, TestimonialModel} from "../../../../../models/home.model";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {AddCounterComponent} from "../../dialog/add-counter/add-counter.component";
import {AddTestimonialComponent} from "../../dialog/add-testimonial/add-testimonial.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    dataSource: any;
    displayedColumns: string[] = ['desc_en', 'desc_ar', 'image', 'action'];
    testimonials: TestimonialModel[] = [];

    constructor(private restService: DataService,
                private toastr: ToastrService,
                private dialog: MatDialog) {
    }



    openAddDialog(){
        let dialog = this.dialog.open(AddTestimonialComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });

    }

    editDialog(data: TestimonialModel){
        let dialog = this.dialog.open(AddTestimonialComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    confirm(data: TestimonialModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this testimonial ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteTestimonial(data);

                }
            });
    }

    deleteTestimonial(data: TestimonialModel) {
        this.restService.deleteTestimonial(data._id).then((res) => {
            this.toastr.success('The testimonial has been deleted successfully', '');
            this.testimonials = this.testimonials.filter(item => item._id !== data._id);
            this.dataSource = new MatTableDataSource(this.testimonials);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    getTestimonials() {
        this.restService.getTestimonials().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
            this.testimonials = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    ngOnInit() {
        this.getTestimonials();
    }


}
