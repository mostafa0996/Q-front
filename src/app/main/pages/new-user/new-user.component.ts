import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../app.service";
import {Category} from "../../../../models/category";
import {CityModel} from "../../../../models/city";
import {UserModel} from "../../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {MapsAPILoader} from "@agm/core";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
    public zoom: number;
    public latitude: number;
    public longitude: number;
    public location: string;
    public address: string;
    UserForm: FormGroup;
    categories: Category[] = [];
    SelectedCategories: any[] = [];
    cities: CityModel[] = [];
    data: UserModel;
    images: string[] = [];
    id: string;
    // @ts-ignore
    @ViewChild('search')
    public searchElementRef: ElementRef;
    private geoCoder;
    isUploading = false;

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

    addControl($event, category: Category) {
        if ($event.source._selected) {
            const fc = new FormControl(null, [Validators.required]);
            this.UserForm.addControl(category.title_en, fc);
        } else {
            this.UserForm.removeControl(category.title_en);
        }
    }

    getCategories() {
        this.restService.getCategories().then((res) => {
            this.categories = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    prepareCourierForm() {
        this.UserForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            categories: [null],
            list_categories: [null, [Validators.required]],
            categoryWithVechiles: [null],
            user: [null],
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
            designation: [null, [Validators.required]],
            company_name: [null, [Validators.required]],
            date_issue_licences: [null, [Validators.required]],
            date_expired_licences: [null, [Validators.required]],
            website: [null, [Validators.required , Validators.pattern(this.appService.urlRegex)]],
            _id: [null]

        });

    }

    prepareCommerceForm() {
        this.UserForm = this._formBuilder.group({
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
            user: [null],


        });

    }


    getCities() {
        this.restService.getCities().then((res) => {
            this.cities = res.results;

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    addUser() {
        if(this.id === 'courier' || this.f.role.value === 'company'){
            this.selectCategory();
        }

        let user: UserModel = this.UserForm.value as UserModel;
        this.restService.createUser(user).then((res) => {
            this.toastr.success('The account has been created successfully', '');
            this.UserForm.reset();
            Object.keys(this.UserForm.controls).forEach(key => {
                this.UserForm.controls[key].setErrors(null);
            });
        }).catch((err: HttpErrorResponse) => {

            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    updateUser() {
        // tslint:disable-next-line:prefer-const
        if(this.id === 'courier' || this.f.role.value === 'company'){
            this.selectCategory();
        }
        this.f.user.setValue(this.id);
        let user: UserModel = this.UserForm.value as UserModel;
        this.restService.activeSupplier(user).then((res) => {
            this.toastr.success(res.message, '');
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

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


    getsupplier(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.getSupplierByID(id).then(res => {
            if (res.role === 'company') {
                this.prepareCourierForm();
                this.UserForm.patchValue(res);
                this.getCategories();
                this.getCities();
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

            } else {
                this.prepareCommerceForm();
                this.UserForm.patchValue(res);
            }

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    ngOnInit() {

        this.activateRouter.params.subscribe(params => {
            this.id = params.id;
            if (params.id === 'courier') {

                this.prepareCourierForm();
                this.f.active.setValue('1');
                this.f.role.setValue('company');
                this.getCategories();
                this.getCities();

            } else if (params.id === 'ecommerce') {

                this.prepareCommerceForm();
                this.f.active.setValue('1');
                this.f.role.setValue('ecommerce');

            } else {
                this.prepareCourierForm();
                this.getsupplier(params.id);
            }

        });

        if(this.id === 'courier' ) {
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
        }

    }

    onUpload(fileInput) {
        const fileData = <File>fileInput.target.files[0];
        let size = (fileData.size / (1024 * 1024));
        if(size <= 5){
            this.isUploading = true;
            const formData = new FormData();
            formData.append('pdf', fileData);
            this.restService.uploadPDF(formData).then((res) => {
                this.isUploading = false;
                this.f.trade_licence.setValue(res.url);
            }).catch((err: HttpErrorResponse) => {
                if (err) {
                    this.toastr.error(err.error.message, '');
                    this.isUploading = false;

                }
            });
        }else{
            this.toastr.error('The file size exceed 5MB', '');

        }

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
