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
  fiteredUsers: string = "";

  constructor(
    private userWebService: UserWebService
  ) { }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPage: 10, totalPages: 0, totalItems: 0 };
    this.populatesUsers();
  }

  populatesUsers(): void {
    this.userWebService.getUsersFromBack(this.pagination.currentPage, this.pagination.itemsPage, this.fiteredUsers).subscribe(
      (response: any) => {
        this.pagination.totalItems = response.headers.get('X-Total-Count');
        this.pagination.totalPages = this.getTotalPage(this.pagination.totalItems);
        this.pages = _.range(1, this.pagination.totalPages + 1);
        this.users = response.body;
      }
    );
  }

  getTotalPage(totalItems: number): number {
    return Math.ceil(totalItems / this.pagination.itemsPage);
  }

  paginate(page: number): void {
    this.pagination.currentPage = page;
    this.populatesUsers();
  }

  filter(event: any): void {
    this.fiteredUsers = event.target.value;
    this.pagination.currentPage = 1;
    this.populatesUsers();
  }

}
