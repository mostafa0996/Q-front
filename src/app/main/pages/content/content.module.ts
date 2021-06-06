import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../../../../guard/auth.guard";
import {ContentComponent} from "./content.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "ng2-ckeditor";


const routes = [
    {
        path     : 'content',
        component: ContentComponent,
        canActivate: [AuthGuard],
    }
];


@NgModule({
    declarations: [ContentComponent, TermsConditionComponent,
        PrivacyPolicyComponent, AboutUsComponent],
    exports: [
        AboutUsComponent,
        TermsConditionComponent,
        PrivacyPolicyComponent,
        ContentComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        CKEditorModule,
        MatTableModule,
        MatTabsModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,

    ]
})
export class ContentModule { }
