import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../app.service";
import {DataService} from "../../../../services/data.service";
import {OrderModel} from "../../../../models/order.model";
import {PaginationModel} from "../../../../models/pagination.model";
import {CountdownTimerService} from "ngx-timer";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-shipment-details',
    templateUrl: './shipment-details.component.html',
    styleUrls: ['./shipment-details.component.scss']
})
export class ShipmentDetailsComponent implements OnInit {
    isExpired: boolean;
    date: string;
    current: any = new Date();
    data: OrderModel;
    pagination = new PaginationModel();
    cdate = new Date();
    testConfig: any;
    minutes: number;
    seconds: number;
    counter: { min: number, sec: number };

    constructor(private router: ActivatedRoute,
                private appService: AppService,
                private restService: DataService,
                private routerLink: Router,
                private toastr: ToastrService,
                private countDownTimerService: CountdownTimerService,
    ) {

    }


    getOrders(id) {

        this.restService.getShipmentDetails(id).then((res) => {
            this.data = res;
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }

        });
    }

    rejectAcceptShipment(status) {
        this.pagination.status = status;
        this.pagination.shipment = this.data._id;
        this.restService.rejectAcceptShipment(this.pagination).then((res) => {
            this.toastr.success(res.message, '');
            this.data.status = status;
            this.routerLink.navigate(['/pages/shipments']);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    startTimer(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds - (m * 60) ;
        this.counter = {
            min: m,
            sec: s
        }; // choose whatever you want
        let intervalId = setInterval(() => {
             if (this.counter.min === 0 && this.counter.sec === 0){
                clearInterval(intervalId);
                this.isExpired = true;
            }else if (this.counter.sec - 1 == -1) {
                this.counter.min -= 1;
                this.counter.sec = 59;

            } else{
                this.counter.sec -= 1;
                if(this.counter.min == 0 &&  this.counter.sec < 10){
                }
            }
        }, 1000);
    }


    ngOnInit() {
        this.router.params.subscribe(params => {
            this.date = params['date'];
            const remaining = Math.floor((this.current - +(new Date(this.date))) / (1000));
            this.isExpired = (Math.floor((this.current - +(new Date(this.date))) / (1000))) <= 5 * 60 ? false : true;
            this.getOrders(params['id']);

            if (!this.isExpired) {
                this.startTimer(300 - remaining);
            }
        });

    }

}
