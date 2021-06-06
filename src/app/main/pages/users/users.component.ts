import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {




    constructor(private restService: DataService,
                private toastr: ToastrService) {

    }


    ngOnInit() {

    }
}
