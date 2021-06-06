import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Filter} from "../../../../models/filter";
import {UserModel} from "../../../../models/user.model";

@Component({
    selector: 'app-spplier-details',
    templateUrl: './spplier-details.component.html',
    styleUrls: ['./spplier-details.component.scss']
})
export class SpplierDetailsComponent implements OnInit {
    filter = new Filter();
    supplier: UserModel;

    constructor(private activatedRoute: ActivatedRoute,
                public restService: DataService,
                private toastr: ToastrService) {
    }


    getsupplier(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.getSupplierByID(id).then(res => {
            this.supplier = res;

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    activeBlock(value) {
        // tslint:disable-next-line:prefer-const
        let data;
        this.supplier.active = value;
        this.supplier.user = this.supplier._id;
        if (value === 1) {
            data = 'active';
        } else {
            data = 'reject';
        }
        this.restService.activeSupplier(this.supplier).then((res) => {
                Swal.fire(
                    'Update!',
                    'This courier is ' + data + ' now',
                    'success'
                );

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    confirmeApprove(value) {
        let status;
        if (value === 1) {
            status = 'approval';
        } else {
            status = 'reject';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to send ' + status + ' to this courier ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(value);

                }
            });
    }


    ngOnInit() {
        this.activatedRoute.params.subscribe(paramsId => {
            this.filter.company_id = paramsId.id;
            this.getsupplier(paramsId.id);
        });
    }

}
