import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import * as shape from 'd3-shape';


import {fuseAnimations} from '@fuse/animations';

import {ProjectDashboardService} from 'app/main/apps/dashboards/project/project.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../../../app.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'project-dashboard',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProjectDashboardComponent implements OnInit {
    projects: any[];
    selectedProject: any;
    settingForm: FormGroup;
    name: string;
    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
    data: any[] = [];
    admin = false;
    dataSource: any;
    dataSourceIncentive: any;
    page = 0;
    final = 0;

    dateNow = Date.now();
    Statisfics: any;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private restService: DataService,
        private _formBuilder: FormBuilder,
        public appService: AppService,
        private toastr: ToastrService,
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService
    ) {
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange: 'TW',
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect: (ev) => {
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve: shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange: 'TW',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: false,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange: 'TW',
            xAxis: false,
            yAxis: false,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve: shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    getStatisfics() {
        this.restService.getStatisfics().then((res) => {
            this.Statisfics = res;
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    // CountNormal: 9
    // CountSp: 13
    // CountAdmin: 1
    // KitchensKitchensCount: 14
    // KitchensCountActive: 13
    // KitchensCountUnactive: 1
    /**
     * On initToday
     */
    ngOnInit(): void {
        this.appService.isPermissionProject.subscribe(value =>{
            if(value){
                console.log(value);
                this.getStatisfics();
            }
        });

        this.projects = this._projectDashboardService.projects;
        this.selectedProject = this.projects[0];
        this.widgets = this._projectDashboardService.widgets;

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any> {
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11) {
        super();

    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}

