import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {UserModel} from '../../../../../models/user.model';
import {DataService} from '../../../../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {PaginationModel} from '../../../../../models/pagination.model';

@Component({
    selector: 'app-service-providers',
    templateUrl: './service-providers.component.html',
    styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {

    displayedColumns: string[] = ['first_name', 'last_name', 'company_name', 'email', 'phone', 'active', 'action'];
    dataSource: any;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    type: string;
    users: UserModel[];
    pagination = new PaginationModel();

    pagesList: number[] = [];


    constructor(private restService: DataService,
                private toastr: ToastrService) {
        this.pagination.page = 0;
        this.pagination.limit = 20;
        this.pagination.role = 'company';
    }

    applyFilter(filterValue: string) {
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getUsers();
    }

    getUsers() {
        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
            this.pagination.limit = this.pageEvent.pageSize;
        }
        this.restService.getUsers(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.dataSource = new MatTableDataSource(res.results);
            this.users = res.results;
            if (this.pagination.page == 0) {
                this.pagesList = [];
                let i = 0;
                for (i; i <= res.totalPages - 1; i++) {
                    this.pagesList.push(i);
                }
            }

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    getUsersByPage(index) {
        if (index > 0) {
            this.pagination.page = index;
        } else {
            this.pagination.page = index;
        }

        this.getUsers();

    }


    deleteAccount(user: UserModel) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you delete this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes,delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteUserConfirm(user);

                }
            });
    }

    deleteUserConfirm(user) {
        this.restService.deleteUser(user._id).then((res) => {
            this.toastr.success('The account has been deleted successfully', '');
            this.users = this.users.filter(item => item._id != user._id);
            this.dataSource = new MatTableDataSource(this.users);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }

    activeBlock(data: UserModel, status) {
        // tslint:disable-next-line:prefer-const
        data.active = status;
        this.restService.activeSupplier(data).then((res) => {
            let index = this.users.findIndex(item => item._id === data._id);
            this.users[index].active = status;
            this.dataSource = new MatTableDataSource(this.users);

            Swal.fire(
                'Update!',
                'the user status has been updated.',
                'success'
            );

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');

                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    confirmeActiveBlock(item, status) {
        let statusName: string;
        if (status == 1) {
            statusName = 'active';
        } else if (status == 0) {
            statusName = 'unactive';
        } else if (status == 2) {
            statusName = 'block';
        } else {
            statusName = 'active';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + statusName + ' this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + statusName + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(item, status);

                }
            });
    }

    search(value) {
        if (value) {
            this.pagination.keyword = value;

        } else {
            this.pagination.keyword = '';

        }
        this.pagination.page = 0;
        this.pagination.keyword = value;
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getUsers();

    }

    ngOnInit() {
        this.pagination.keyword = '';
        this.getUsers();

    }

}
