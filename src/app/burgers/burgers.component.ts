import { Component, OnInit } from '@angular/core';
import { Burger } from '../burger';
import { BurgerService } from '../burger.service';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.css']
})
export class BurgersComponent implements OnInit {
  burgers: Burger[];
  currentUser: User;
  constructor(
    private burgerService: BurgerService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
  ngOnInit() {
    if (typeof this.burgers === 'undefined') this.getBurgers();
    if (this.currentUser === null) this.currentUser = new User();
  }

  getBurgers(): void {
    this.burgerService
      .getBurgers()
      .subscribe(burgers => (this.burgers = burgers));
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

  delete(burger: Burger): void {
    this.burgers = this.burgers.filter(h => h !== burger);
    this.burgerService;
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,verticalPosition: 'top'
    });
  }
}
