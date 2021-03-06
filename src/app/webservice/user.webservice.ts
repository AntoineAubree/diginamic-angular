import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserWebService {

    private baseUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = 'http://localhost:3000/users/';
    }

    getUsersFromBack(page: number, limit: number, fiteredUsers: string): Observable<any> {
        return this.http.get<User[]>(this.baseUrl + `?_page=${page}&_limit=${limit}&q=${fiteredUsers}`, { observe: 'response' });
    }

    create(user: User) {
        return this.http.post(this.baseUrl, user);
    }

    update(user: User) {
        return this.http.put(this.baseUrl + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.baseUrl + id);
    }

}