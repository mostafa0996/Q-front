import { Component, OnInit } from '@angular/core';
import { TestimonialModel} from "../../../../../models/home.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {


    data: TestimonialModel;
    testimonialForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<AddTestimonialComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.testimonialForm.controls;
    }

    addTestimonial() {
        // tslint:disable-next-line:prefer-const
        let data: TestimonialModel = this.testimonialForm.value as TestimonialModel;
        this.restService.addTestimonial(data).then((res) => {
            this.toastr.success('The counter has been added successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    updateTestimonial() {
        // tslint:disable-next-line:prefer-const
        let data: TestimonialModel = this.testimonialForm.value as TestimonialModel;
        this.restService.updateTestimontial(data).then((res) => {
            this.toastr.success('The testimonial has been updated successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    onUpload(fileInput) {
        const fileData =  <File>fileInput.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);
        this.restService.uploadImage(formData).then((res) => {
            this.f.image.setValue(res.original.filename);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
               this.toastr.error(err.error.message, '');

               if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    prepareForm() {
        this.testimonialForm = this._formBuilder.group({
            description_ar: [null, [Validators.required]],
            description_en: [null, [Validators.required]],
            image: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.testimonialForm.patchValue(this.data);
        }
    }


}
