import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentModel} from "../../../../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {DataService} from "../../../../../services/data.service";




@Component({
    selector: 'app-terms-condition',
    templateUrl: './terms-condition.component.html',
    styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
    contentForm: FormGroup;
    ckeConfig: any;
    log: string;
    content: ContentModel;
    res: any;
    constructor(private _formBuilder: FormBuilder,
                private toastr: ToastrService,
                private restService: DataService) {
    }



    get f(){
        return this.contentForm.controls;
    }

    prepareForm() {
        this.contentForm = this._formBuilder.group({
            _id: [null],
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            content_ar: [null, [Validators.required]],
            content_en: [null, [Validators.required]],
            type: [null, [Validators.required]],
        });
    }

    saveContent() {
        let model: ContentModel = this.contentForm.value as ContentModel;
        this.restService.saveContent(model).then((res) => {
            this.toastr.success( 'The content has been added successfully', '');
        }).catch((err: HttpErrorResponse) => {
        });
    }

    getContent(id) {
        this.restService.getContent(id).then((res) => {
            let result: ContentModel = res as ContentModel;
            this.contentForm.patchValue(result);
        }).catch((err: HttpErrorResponse) => {
        });
    }

    ngOnInit() {
        this.prepareForm();
        this.f.type.setValue('3');

        this.getContent('3');
        this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
        };
    }

}
