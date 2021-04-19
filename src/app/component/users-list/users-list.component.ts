import { User } from '../../models/user';
import { UserWebService } from '../../webservice/user.webservice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userWebService: UserWebService
  ) { }

  ngOnInit(): void {
    this.userWebService.getUsersFromBack().subscribe(
      (users) => {
        this.users = users;
      }
    )
  }




}
