import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {CounterModel} from "../../../../../models/home.model";
import Swal from "sweetalert2";
import {EditCategoryComponent} from "../../dialog/edit-category/edit-category.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCounterComponent} from "../../dialog/add-counter/add-counter.component";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
    dataSource: any;
    displayedColumns: string[] = [ 'title_en', 'title_ar', 'value', 'action'];
    counters: CounterModel[] = [] ;



  constructor(private restService: DataService,
              private toastr: ToastrService,
              private dialog: MatDialog) { }

    openAddDialog(){
        let dialog = this.dialog.open(AddCounterComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });

    }

    editDialog(data: CounterModel){
        let dialog = this.dialog.open(AddCounterComponent);
        dialog.componentInstance.data = data;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(data);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    confirm(data: CounterModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this counter ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteCounter(data);

                }
            });
    }

    deleteCounter(data: CounterModel){
        this.restService.deleteCounter(data._id).then((res) => {
            this.toastr.success('The counter has been deleted successfully', '');
            this.counters = this.counters.filter(item => item._id !== data._id);
            this.dataSource = new MatTableDataSource(this.counters);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getCounters() {
        this.restService.getCounter().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
            this.counters =  res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


  ngOnInit() {
      this.getCounters();
  }

}
