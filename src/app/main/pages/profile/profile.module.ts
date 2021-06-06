import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import {AgmCoreModule} from "@agm/core";
import {AuthGuard} from "../../../../guard/auth.guard";
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { SettingsComponent } from './tabs/settings/settings.component';


const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],

        resolve  : {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        SettingsComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule ,
        FuseSharedModule,
        MatDatepickerModule ,
        MatSelectModule,
        CommonModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatRadioModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxMaterialTimepickerModule.setLocale('ar-AE'),
        MatGoogleMapsAutocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
            libraries: ['places']
        }),
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
