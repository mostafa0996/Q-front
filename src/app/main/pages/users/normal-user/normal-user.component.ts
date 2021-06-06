import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {UserModel} from '../../../../../models/user.model';
import {DataService} from '../../../../../services/data.service';
import {ToastrService} from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {PaginationModel} from '../../../../../models/pagination.model';
import {NewAdminComponent} from '../../dialog/new-admin/new-admin.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-normal-user',
    templateUrl: './normal-user.component.html',
    styleUrls: ['./normal-user.component.scss']
})
export class NormalUserComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'active', 'action'];
    dataSource = new MatTableDataSource<any>();
    pageEvent: PageEvent;
    pageSize = 12;
    length: number;
    type: string;
    users: UserModel[];
    pagination = new PaginationModel();
    pagesList: number[] = [];
    // @ts-ignore

    constructor(private restService: DataService,
                private dialog: MatDialog,
                private cdr: ChangeDetectorRef,
                private toastr: ToastrService) {
        this.pagination.page = 0;
        this.pagination.limit = 20;
        this.pagination.role = 'user';
    }



    search(value) {
        if (value) {
            this.pagination.keyword = value;

        } else {
            this.pagination.keyword = '';

        }
        this.pagination.page = 0;
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getUsers();

    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.resultElement;
    }



    getUsersByPage(index) {
        if (index > 0) {
            this.pagination.page = index;
        } else {
            this.pagination.page = index;
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
            this.cdr.detectChanges();

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
                if (err.error.code === 401) {
                    this.restService.logout();
                }
            }
        });
    }


    openDialog() {
        let dialog = this.dialog.open(NewAdminComponent);
        dialog.componentInstance.role = 'user';
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
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


    ngOnInit() {
        this.pagination.keyword = '';

        this.getUsers();

    }

}
