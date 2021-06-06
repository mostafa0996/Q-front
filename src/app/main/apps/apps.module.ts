import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import {AuthGuard} from "../../../guard/auth.guard";

const routes = [

    {
        path        : 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule',
        canActivate: [AuthGuard],

    },

    {
        path: '**',
        redirectTo: 'dashboards/project',

    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule
{
}
