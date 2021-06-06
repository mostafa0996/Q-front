import {Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../../../../../../models/user.model";
import {AppService} from "../../../../../app.service";
import {Category} from "../../../../../../models/category";
import {CityModel} from "../../../../../../models/city";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {MapsAPILoader} from "@agm/core";

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit {
    public zoom: number;
    public latitude: number;
    public longitude: number;
    public location: string;
    public address: string;
    // @ts-ignore
    @ViewChild('search') public searchElementRef: ElementRef;
    UserForm: FormGroup;
    adminForm: FormGroup;
    ecommerceForm: FormGroup;
    categories: Category[] = [];
    cities: CityModel[] = [];
    data: UserModel;
    images: string[] = [];
    id: string;
    role: string;
    phone: string;
    private geoCoder;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private toastr: ToastrService,
                private dialog: MatDialog,
                private activateRouter: ActivatedRoute,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
    ) {

    }


    get f() {
        return this.UserForm.controls;
    }

    get e() {
        return this.ecommerceForm.controls;
    }

    get a() {
        return this.adminForm.controls;
    }


    getCategories() {
        this.restService.getCategories().then((res) => {
            this.categories = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    prepareForm() {
        this.UserForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            categories: [null],
            otp: [null],
            city: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            trade_licence: [null, [Validators.required]],
            locationText: [null, [Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            area: [null, [Validators.required]],
            lat: [null, [Validators.required]],
            lng: [null, [Validators.required]],
            role: [null, [Validators.required]],
            website: [null, [Validators.required , Validators.pattern(this.appService.urlRegex)]],
            designation: [null, [Validators.required]],
            company_name: [null, [Validators.required]],
            date_issue_licences: [null, [Validators.required]],
            date_expired_licences: [null, [Validators.required]],
            _id: [null],
            list_categories: [null, [Validators.required]],
            categoryWithVechiles: [null],


        });


        this.adminForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            role: [null, [Validators.required]],
            _id: [null],
            otp: [null],


        });

        this.ecommerceForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            first_name: [null, [Validators.required]],
            last_name: [null, [Validators.required]],
            trade_licence: [null, [Validators.required]],
            phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
            role: [null, [Validators.required]],
            designation: [null, [Validators.required]],
            company_name: [null, [Validators.required]],
            website: [null, [Validators.required , Validators.pattern(this.appService.urlRegex)]],
            date_issue_licences: [null, [Validators.required]],
            date_expired_licences: [null, [Validators.required]],
            _id: [null],
            otp: [null],


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

    selectCategory() {
        let selectedCategories: any[] = [];
        let categoriesIDs: any[] = [];
        let categories = this.f.list_categories.value;
        categories.forEach(cat => {
            let category = this.categories.filter(item => item.title_en === cat);
            if (category.length) {
                categoriesIDs.push(category[0]._id);
                selectedCategories.push({
                    category: category[0]._id,
                    countOfVechiles: this.UserForm.controls[cat].value
                });
            }
        });
        this.f.categoryWithVechiles.setValue(selectedCategories);
        this.f.categories.setValue(categoriesIDs);
    }

    getSelectedCategory() {
        let categoriesIDs: any[] = [];
        let categoriesTitle: any[] = [];
        let categories = this.f.categoryWithVechiles.value;
        categories.forEach(cat => {
            categoriesTitle.push(cat.categoryObj.title);
            categoriesIDs.push(cat.categoryObj._id);
            const fc = new FormControl(null, [Validators.required]);
            this.UserForm.addControl(cat.categoryObj.title, fc);
            this.UserForm.controls[cat.categoryObj.title].setValue(cat.countOfVechiles);

        });
        this.f.list_categories.setValue(categoriesTitle);
        this.f.categories.setValue(categoriesIDs);

    }

    sendOTP() {
        let user: UserModel;
        if (this.role === 'admin' || this.role === 'master') {
            user = this.adminForm.value as UserModel;

        } else if (this.role === 'company'){

            user = this.UserForm.value as UserModel;

        }else{
            user = this.ecommerceForm.value as UserModel;

        }

        this.restService.sendOTPWithOutCheck(user).then((res) => {
            this.toastr.success(res.message, '');
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
            }
        });
    }

    updateUser() {
        // tslint:disable-next-line:prefer-const
        let user: UserModel;
        if (this.role === 'admin' || this.role === 'master') {
            user = this.adminForm.value as UserModel;

        } else if (this.role === 'company'){
            this.selectCategory();
            user = this.UserForm.value as UserModel;
        }else{
            user = this.ecommerceForm.value as UserModel;
        }



        this.restService.updateProfile(user).then((res) => {
            if (this.role === 'admin' || this.role === 'master') {
                this.phone = this.a.phone.value;
            } else if (this.role === 'company'){
                this.phone = this.f.phone.value;
            }else{
                this.phone = this.e.phone.value;
            }

            this.toastr.success(res.message, '');

        }).catch((err: HttpErrorResponse) => {

            this.toastr.error(err.error.message , '');
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    getProfile() {
        // tslint:disable-next-line:prefer-const
        this.restService.getProfile().then(res => {
            this.role = res.role;
            if (res.role === 'admin' || res.role === 'master') {
                this.adminForm.patchValue(res);
                this.phone = this.a.phone.value;

            } else if (res.role === 'company'){
                this.UserForm.patchValue(res);
                this.phone = this.f.phone.value;
                this.getSelectedCategory();
                this.mapsAPILoader.load().then(() => {
                    this.setCurrentLocation();
                    // tslint:disable-next-line:new-parens
                    this.geoCoder = new google.maps.Geocoder;
                    var InputOptions = {
                        componentRestrictions: { country: 'AE' } // I want multiple counteries here**
                    };
                    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement , InputOptions);
                    autocomplete.addListener('place_changed', () => {
                        this.ngZone.run(() => {
                            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                            if (place.geometry === undefined || place.geometry === null) {
                                return;
                            }
                            this.latitude = place.geometry.location.lat();
                            this.longitude = place.geometry.location.lng();
                            this.getAddress(this.latitude, this.longitude);
                            this.zoom = 12;
                        });
                    });
                });
            }else{
                this.ecommerceForm.patchValue(res);
            }
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    ngOnInit() {
        this.prepareForm();
        this.getCategories();
        this.getCities();
        this.getProfile();


    }


    addControl($event, category: Category) {
        if ($event.source._selected) {
            const fc = new FormControl(null, [Validators.required]);
            this.UserForm.addControl(category.title_en, fc);
            console.log(this.UserForm);
        } else {
            this.UserForm.removeControl(category.title_en);
            console.log(this.UserForm);

        }
    }

    onUpload(fileInput) {
        const fileData = <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('pdf', fileData);
        this.restService.uploadPDF(formData).then((res) => {
            this.f.trade_licence.setValue(res.url);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    getAddress(latitude, longitude) {
        this.f.lng.setValue(longitude.toString());
        this.f.lat.setValue(latitude.toString());

        this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.address = results[0].formatted_address;
                    this.f.locationText.setValue(this.address);
                    this.f.area.setValue(this.address);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }

    markerDragEnd($event) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (this.data) {
                    this.latitude = +(this.data.lat);
                    this.longitude = +(this.data.lng);
                    this.zoom = 8;
                    this.getAddress(this.latitude, this.longitude);
                } else {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.zoom = 8;
                    this.getAddress(this.latitude, this.longitude);
                }

            });
        }
    }

}
