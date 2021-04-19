import { User } from '../../models/user';
import { UserWebService } from '../../webservice/user.webservice';
import { Component, OnInit } from '@angular/core';
import _ from 'underscore';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  pagination: any;
  pages: number[];

  constructor(
    private userWebService: UserWebService
  ) { }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPage: 6, totalPages: 0 };
    this.populatesUsers();
  }

  populatesUsers() {
    this.userWebService.getUsersFromBack(this.pagination.currentPage, this.pagination.itemsPage).subscribe(
      (response: any) => {
        this.pagination.totalPages = this.getTotalPage(response.headers.get('X-Total-Count'));
        this.pages = _.range(1, this.pagination.totalPages + 1);
        this.users = response.body;
      }
    );
  }

  getTotalPage(totalItems: number): number {
    return Math.ceil(totalItems / this.pagination.itemsPage);
  }

  paginate() {

  }

}
