import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeContentComponent} from "./home-content.component";
import {AuthGuard} from "../../../../guard/auth.guard";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { CounterComponent } from './counter/counter.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { PartnerComponent } from './partner/partner.component';
import { HomeAboutComponent } from './home-about/home-about.component';


const routes = [
    {
        path: 'home-content',
        component: HomeContentComponent,
        canActivate: [AuthGuard],

    }
];


@NgModule({
  declarations: [HomeContentComponent, CounterComponent, TestimonialsComponent, PartnerComponent, HomeAboutComponent],
  imports: [
      RouterModule.forChild(routes),
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      FuseSharedModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatSelectModule,
      MatTabsModule,
      MatDatepickerModule,
  ]
})
export class HomeContentModule { }
