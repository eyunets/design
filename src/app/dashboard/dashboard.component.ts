import { Component, OnInit } from '@angular/core';
import { Burger } from '../burger';
import { BurgerService } from '../burger.service';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  burgers: Burger[] = [];
  currentUser: User;

  constructor(
    private burgerService: BurgerService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,

  ) {this.authenticationService.currentUser.subscribe(
    x => (this.currentUser = x)
  );}

  ngOnInit() {
    this.getBurgers();
  }

  getBurgers(): void {
    this.burgerService
      .getBurgers()
      .subscribe(burgers => (this.burgers = burgers.slice(1, 5)));
  }
  add(burger: Burger): void {
    if (typeof this.currentUser.burgers === 'undefined') {
      this.currentUser.burgers = new Array<Burger>();
      this.currentUser.burgers.push(burger);
    } else {
      this.currentUser.burgers.push(burger);
    }
    this.userService
      .update(this.currentUser)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
        },
        error => {
          // this.alertService.error(error);
        }
      );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }
}
