import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';
import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {AppService} from "../../../../../app.service";
import {DataService} from "../../../../../../services/data.service";
import {navigation, navigationCommerce, navigationSup} from "../../../../../navigation/navigation";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    name = '';
    email = '';
    image: string;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(private appService: AppService,
                public restService: DataService,
                private _fuseConfigService: FuseConfigService,
                private _fuseNavigationService: FuseNavigationService,
                private _fuseSidebarService: FuseSidebarService,
                private _router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective, {static: true})
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        this._fusePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    getData() {
        // tslint:disable-next-line:prefer-const
        this.restService.getProfile().then((res) => {
            if (res.role === 'admin') {
                this.getPermissions(res._id);

            } else if (res.role === 'master') {
                this.appService.isPermissionProject.next(true);
                this.navigation = navigation;

            } else if (res.role === 'company') {
                this.navigation = navigationSup;

            } else {
                this.navigation = navigationCommerce;
            }

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }

        });
    }

    getPermissions(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.getPermissions(id).then((res) => {
            let isPermission = res.results.filter(item => item.id === 'project');
            if (isPermission.length) {
                this.appService.isPermissionProject.next(true);
            } else {
                this.appService.isPermissionProject.next(false);

            }

            this.navigation = [
                {
                    id: 'applications',
                    title: 'Applications',
                    translate: 'NAV.APPLICATIONS',
                    type: 'group',
                    icon: 'apps',
                    children: res.results
                },
            ];

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }

        });
    }


    /**
     * On init
     */
    ngOnInit(): void {
        if (localStorage.getItem('auth_deliver_admin') && localStorage.getItem('auth_deliver_admin') != 'undefined') {
            this.getData();
            this._router.events
                .pipe(
                    filter((event) => event instanceof NavigationEnd),
                    takeUntil(this._unsubscribeAll)
                )
                .subscribe(() => {
                        if (this._fuseSidebarService.getSidebar('navbar')) {
                            this._fuseSidebarService.getSidebar('navbar').close();
                        }
                    }
                );
        }

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;

            });

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
