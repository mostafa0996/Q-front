import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "../../../app.service";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CityModel} from "../../../../models/city";
import {LocationComponent} from "../dialog/location/location.component";
import {Category} from "../../../../models/category";
import {ShipmentGuestModel, ShipmentModel} from "../../../../models/Shipment.model";
import {TypeModel} from "../../../../models/type.model";
import {UserModel} from "../../../../models/user.model";
import {VerificationGuestComponent} from "../dialog/verification-guest/verification-guest.component";

@Component({
    selector: 'app-new-shipment',
    templateUrl: './new-shipment.component.html',
    styleUrls: ['./new-shipment.component.scss']
})
export class NewShipmentComponent implements OnInit {
    userForm: FormGroup;
    StartAddress: FormGroup;
    endAddress: FormGroup;
    costForm: FormGroup;
    calculatorForm: FormGroup;
    addCostForm: FormGroup;
    cities: CityModel[] = [];
    categories: Category[] = [];
    types: TypeModel[] = [];

    constructor(private dialog: MatDialog,
                private fb: FormBuilder,
                public appService: AppService,
                private toastr: ToastrService,
                private restService: DataService) {
    }


    get f() {
        return this.calculatorForm.controls;
    }

    get startAddress() {
        return this.StartAddress.controls;
    }

    get u() {
        return this.userForm.controls;
    }

    get c() {
        return this.costForm.controls;
    }


    get toAddress() {
        return this.endAddress.controls;
    }

    openMap(address: string) {
        const dialogRef = this.dialog.open(LocationComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (address === 'from') {
                    this.startAddress.lng.setValue(result.longitude);
                    this.startAddress.lat.setValue(result.latitude);
                    this.startAddress.locationText.setValue(result.locationText);
                } else {
                    this.toAddress.lng.setValue(result.longitude);
                    this.toAddress.lat.setValue(result.latitude);
                    this.toAddress.locationText.setValue(result.locationText);
                }
            }
        });
    }



    calculator() {
        // this.isDone = true;
        let cost: ShipmentModel = this.costForm.value as ShipmentModel;
        this.restService.calculateCost(cost).then((res) => {
            this.f.cost.setValue(+res.results[0].cost);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    // this.restService.refreshTokenUser();
                }
            }
        });
    }


    prepareForm() {
        this.calculatorForm = this.fb.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            subCategory: ['', Validators.required],
            weight: [''],
            comments: [''],
            cost: [''],
            other: [''],
            type: [''],
        });
        this.addCostForm = this.fb.group({
            cost: ['', Validators.required],
            other: ['',  Validators.required],
            costValue: [0],
            otherValue: [0]
        })


        this.userForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
        });

        this.costForm = this.fb.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            category: [''],
        });


        //
        this.StartAddress = this.fb.group({
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            city: ['', Validators.required],
            area: ['', Validators.required],
            street: ['', Validators.required],
            floor: [''],
            building: ['', Validators.required],
            locationText: ['', Validators.required],
            apartment: [''],
            type: ['', Validators.required],
            lng: ['', Validators.required],
            lat: ['', Validators.required]
        });
        //
        this.endAddress = this.fb.group({
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            city: ['', Validators.required],
            area: ['', Validators.required],
            street: ['', Validators.required],
            floor: [''],
            building: ['', Validators.required],
            locationText: ['', Validators.required],
            apartment: [''],
            type: ['', Validators.required],
            lng: ['', Validators.required],
            lat: ['', Validators.required]
        });
    }


    getCategories() {
        this.restService.getCategories().then((res) => {
            this.categories = res.results;

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    // this.restService.refreshTokenUser();
                }
            }
        });
    }

    getCities() {
        this.restService.getCities().then((res) => {
            this.cities = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    getTypes() {
        this.restService.getTypes().then((res) => {
            this.types = res.results;
            this.f.type.setValue(this.types[0]._id)
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    sendOTPGuest() {
        this.addCostForm.get('cost').value  == 'cod' ? this.calculatorForm.get('cost').setValue(this.addCostForm.get('costValue').value) : this.calculatorForm.get('cost').setValue(0);
        this.addCostForm.get('other').value  == 'cod' ? this.calculatorForm.get('other').setValue(this.addCostForm.get('otherValue').value) : this.calculatorForm.get('other').setValue(0);
        let guest = new ShipmentGuestModel();
        this.calculatorForm.value.type= '5fa3d7169ecae064fec085e6';
        guest.from = this.StartAddress.value;
        guest.to = this.endAddress.value;
        guest.shipment = this.calculatorForm.value;
        guest.user = this.userForm.value;
        console.log(this.calculatorForm.value)
        const user: UserModel = this.userForm.value as UserModel;
        this.restService.sendOTPGuest(user).then((res) => {
            let dialog = this.dialog.open(VerificationGuestComponent);
            dialog.componentInstance.data = guest;
            dialog.afterClosed().subscribe(result => {
                if (result) {
                    window.scroll(0 ,0);
                    this.toastr.success('Your Shipment Sent Successfully', '');
                    // this.calculatorForm.reset();
                    // this.StartAddress.reset();
                    // this.endAddress.reset();
                    // this.costForm.reset();
                    // this.userForm.reset();
                }
            });

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.status === 400) {
                    this.toastr.error('You requested verification code many times in short time , please try again after 2 hours', '');
                } else {
                    this.toastr.error(err.error.message, '');
                }
            }
        });
    }



    ngOnInit() {
        this.prepareForm();
        this.getCities();
        this.getCategories();
        this.getTypes();
        this.startAddress.type.setValue(2);
        this.toAddress.type.setValue(2);
    }

}
