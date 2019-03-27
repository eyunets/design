import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    if (JSON.parse(localStorage.getItem('currentUser')) == null) {
      localStorage.setItem(
        'currentUser',
        '{"id":3,"username":"anonym","firstName":"anonym","lastName":"anonym","token":"fake-jwt-token"}'
      );
    }
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.login('anonym', 'anonym');
  }
  ngOnInit() {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`/users/authenticate`, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    /*localStorage.removeItem('currentUser');
    localStorage.setItem(
      'currentUser',
      '{"id":3,"username":"anonym","firstName":"anonym","lastName":"anonym","token":"fake-jwt-token"}'
    );
    this.currentUserSubject.next(null);
    let user = new User();
    user.username = 'anonym';
    user.password = 'anonym';
    this.currentUserSubject.next(user);

    this.currentUserSubject.next(null);
    return this.login('anonym', 'anonym');*/
    let username = 'anonym';
    let password = 'anonym';
    return this.http
      .post<any>(`/users/authenticate`, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
}
