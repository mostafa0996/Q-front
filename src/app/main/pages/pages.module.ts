import { AccountsModule } from './accounts/accounts.module';
import {NgModule} from '@angular/core';

import {LoginModule} from 'app/main/pages/authentication/login/login.module';
import {RegisterModule} from 'app/main/pages/authentication/register/register.module';
import {ForgotPasswordModule} from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import {ResetPasswordModule} from 'app/main/pages/authentication/reset-password/reset-password.module';
import {ComingSoonModule} from 'app/main/pages/coming-soon/coming-soon.module';
import {Error404Module} from 'app/main/pages/errors/404/error-404.module';
import {Error500Module} from 'app/main/pages/errors/500/error-500.module';
import {SearchClassicModule} from 'app/main/pages/search/classic/search-classic.module';
import {SearchModernModule} from 'app/main/pages/search/modern/search-modern.module';
import {EditCategoryComponent} from "./dialog/edit-category/edit-category.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ImageCropperComponent, ImageCropperModule} from "ngx-image-cropper";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import {AgmCoreModule} from "@agm/core";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {CategoriesModule} from "./categories/categories.module";
import {ProfileModule} from "./profile/profile.module";
import {FeedbackModule} from "./feedbacks/feedback.module";
import {EditTypeComponent} from './dialog/edit-type/edit-type.component';
import {TypesModule} from "./types/types.module";
import {CountriesModule} from "./countries/countries.module";
import {EditCountryComponent} from './dialog/edit-country/edit-country.component';
import {CroppedImageComponent} from "./cropped-image/cropped-image.component";
import {UsersModule} from "./users/users.module";
import {NewUserModule} from "./new-user/new-user.module";
import {ImageCroppedDialogComponent} from "./dialog/image-cropped-dialog/image-cropped-dialog.component";
import {SubCategoriesModule} from "./sub-categories/sub-categories.module";
import {EditSubCategoryComponent} from "./dialog/edite-sub-category/edit-sub-category.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BannerModule} from "./banner/banner.module";
import {EditBannerComponent} from "./dialog/edit-banner/edit-banner.component";
import {AdvantageModule} from "./advantage/advantage.module";
import { EditAdvantageComponent } from './dialog/edit-advantage/edit-advantage.component';
import {CostsModule} from "./costs/costs.module";
import { EditCostComponent } from './dialog/edit-cost/edit-cost.component';
import {SupplierDetailsModule} from "./spplier-details/supplier-details.module";
import {SubscriptionsModule} from "./subscriptions/subscriptions.module";
import {ContactUsModule} from "./contcat-us/contact-us.module";
import {OrdersModule} from "./orders/orders.module";
import {OrderDetailsComponent} from "./dialog/order-details/order-details.component";
import {ShipmentsSupplierModule} from "./shipments-supplier/shipments-supplier.module";
import {DriversModule} from "./drivers/drivers.module";
import { EditDriverComponent } from './dialog/edit-driver/edit-driver.component';
import { DriversDialogComponent } from './dialog/drivers-dialog/drivers-dialog.component';
import {ShipmentDetailsModule} from "./shipment-details/shipment-details.module";
import {CouriersModule} from "./couriers/couriers.module";
import {CommerceModule} from "./commerces/commerce.module";
import { NewAdminComponent } from './dialog/new-admin/new-admin.component';
import {NewShipmentModule} from "./new-shipment/new-shipment.module";
import {LocationComponent} from "./dialog/location/location.component";
import {VerificationGuestComponent} from "./dialog/verification-guest/verification-guest.component";
import {ContentModule} from "./content/content.module";
import {PermissionsComponent} from "./dialog/permissions/permissions.component";
import {ExportExcelModule} from "./export-excel/export-excel.module";
import {HomeContentModule} from "./home-content/home-content.module";
import { AddPartnerComponent } from './dialog/add-partner/add-partner.component';
import { AddCounterComponent } from './dialog/add-counter/add-counter.component';
import { AddTestimonialComponent } from './dialog/add-testimonial/add-testimonial.component';
import { AddContentComponent } from './dialog/add-content/add-content.component';
import { LogsComponent } from './dialog/logs/logs.component';
import { CourierDialogComponent } from './dialog/courier-dialog/courier-dialog.component';
import { OrdersDriverComponent } from './dialog/orders-driver/orders-driver.component';
// import {ShipmentsUserModule} from './shipments-user/shipments-user.module';
import {MatTabsModule} from '@angular/material';


@NgModule({
    imports: [
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        ComingSoonModule,
        Error404Module,
        Error500Module,
        SearchClassicModule,
        SearchModernModule,
        BannerModule,
        ImageCropperModule,
        SubscriptionsModule,
        OrdersModule,
        MatIconModule,
        ExportExcelModule,
        CategoriesModule,
        DriversModule,
        CostsModule,
        ContentModule,
        NewShipmentModule,
        ProfileModule,
        ShipmentDetailsModule,
        ShipmentsSupplierModule,
        HomeContentModule,
        FeedbackModule,
        TypesModule,
        AdvantageModule,
        SubCategoriesModule,
        CountriesModule,
        CouriersModule,
        CommerceModule,
        SupplierDetailsModule,
        UsersModule,
        ContactUsModule,
        AccountsModule,
        // ShipmentsUserModule,
        NewUserModule,
        ImageCropperModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatRadioModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatRadioModule,
        RouterModule,
        MatGoogleMapsAutocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
            libraries: ['places']
        }),
        NgMultiSelectDropDownModule.forRoot(),
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatTabsModule,
    ],
    exports: [],
    providers: [],
    entryComponents: [EditCategoryComponent, EditTypeComponent, EditCountryComponent  , ImageCroppedDialogComponent,
        EditSubCategoryComponent, EditBannerComponent, EditAdvantageComponent, EditCostComponent, OrderDetailsComponent, EditDriverComponent ,
        DriversDialogComponent , NewAdminComponent , LocationComponent , VerificationGuestComponent , PermissionsComponent , AddCounterComponent,
        AddTestimonialComponent, AddContentComponent, AddPartnerComponent, LogsComponent , CourierDialogComponent, OrdersDriverComponent


    ],
    declarations: [
        EditCategoryComponent,
        EditTypeComponent,
        EditCountryComponent,
        CroppedImageComponent,
        ImageCroppedDialogComponent,
        EditSubCategoryComponent,
        EditBannerComponent,
        EditAdvantageComponent,
        EditCostComponent,
        OrderDetailsComponent,
        EditDriverComponent,
        DriversDialogComponent,
        NewAdminComponent,
        LocationComponent,
        VerificationGuestComponent,
        PermissionsComponent,
        AddPartnerComponent,
        AddCounterComponent,
        AddTestimonialComponent,
        AddContentComponent,
        LogsComponent,
        CourierDialogComponent,
        OrdersDriverComponent,


    ]
})
export class PagesModule {

}
