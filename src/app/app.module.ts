import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {FakeDbService} from 'app/fake-db/fake-db.service';
import {AppComponent} from 'app/app.component';
import {AppStoreModule} from 'app/store/store.module';
import {LayoutModule} from 'app/layout/layout.module';
import {ToastrModule} from "ngx-toastr";
import {InterceptorProvider} from "./_helpers/interceptor";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AsyncPipe, CommonModule} from "@angular/common";

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule',

    },
    {
        path: 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },


    {
        path: '**',
        redirectTo: 'apps',
    },

];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        SweetAlert2Module.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        CommonModule,


    ],
    bootstrap: [
        AppComponent
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService, AsyncPipe
    ],


})

export class AppModule {
}
