import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../app.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../services/data.service";

export interface OptionList {
    id: string;
    _id: string;
    title: string;
    type: string;
    icon: string;
    completed?: boolean;
    user?: boolean;
    url: string;
}


@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
    permissions: OptionList[] = [];
    userID: string;
    subList = [

        {
            id: 'project',
            title: 'Statistics',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/apps/dashboards/project'
        },

        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            icon: 'person',
            completed: false,
            url: '/pages/profile'
        },

        {
            id: 'categories',
            title: 'Categories',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/categories'
        },
        {
            id: 'sub-categories',
            title: 'Sub Categories',
            type: 'item',
            icon: 'dashboard',
            completed: false,

            url: '/pages/sub-categories'
        },
        {
            id: 'types',
            title: 'Types',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/types'
        },
        {
            id: 'cities',
            title: 'Cities',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/countries'
        },
        {
            id: 'banner',
            title: 'Banner',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/banners'
        },
        {
            id: 'advantages',
            title: 'Advantages',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/advantages'
        },
        {
            id: 'costs',
            title: 'Costs',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/costs'
        },

        {
            id: 'users',
            title: 'Users',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/users'
        },
        {
            id: 'suppliers',
            title: 'Couriers',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/couriers'
        },
        {
            id: 'ecommerce',
            title: 'E_Commerce',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/ecommerce'
        },
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/orders/0'
        },
        {
            id: 'content',
            title: 'Content',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/content'
        },
        {
            id: 'home-content',
            title: 'Home Content',
            type: 'item',
            icon: 'dashboard',
            url: '/pages/home-content'
        },
        {
            id: 'feedback',
            title: 'Feedbacks',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/contact-us'
        },
        {
            id: 'Subscriptions',
            title: 'Subscriptions',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/subscriptions'
        },
        {
            id: 'contacts',
            title: 'Contacts',
            type: 'item',
            icon: 'dashboard',
            completed: false,
            url: '/pages/feedbacks'
        },

    ];


    subtasks = this.subList;


    constructor(private appService: AppService,
                private restService: DataService
    ) {
    }


    updateList(data) {
        data.user  = this.userID;
        if (data.completed) {
            this.addPermission(data);
        } else {
            this.deletePermission(data);

        }
    }


    addPermission(data) {
        // tslint:disable-next-line:prefer-const
        this.restService.addPermission(data).then((res) => {
            this.subList.filter(data =>{
               if(data.id === res.id){
                   data.completed = true;
               }
            });


        }).catch((err: HttpErrorResponse) => {

        });
    }


    deletePermission(data) {
        // tslint:disable-next-line:prefer-const
        this.restService.deletePermission(data).then((res) => {
            this.subList.filter(item =>{
                if(data.id === item.id){
                    data.completed = false;
                }
            });
        }).catch((err: HttpErrorResponse) => {

        });
    }

    getPermissions() {
        // tslint:disable-next-line:prefer-const
        this.restService.getPermissions(this.userID).then((res) => {
                this.subList.forEach(item => {
                        this.permissions = res.results;
                        let is_selected = res.results.filter(data => data.id === item.id);
                        if (is_selected.length) {
                            item.completed = true;
                            item['_id'] = is_selected[0]._id;
                        } else {
                            item.completed = false;
                        }
                    }
                );
        }).catch((err: HttpErrorResponse) => {

        });
    }

    ngOnInit() {
        this.getPermissions();

    }

}
