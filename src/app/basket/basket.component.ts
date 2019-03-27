import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Burger } from '../burger';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  delete(burger: Burger): void {
    if (typeof this.currentUser.burgers === 'undefined') {
      this.currentUser.burgers = new Array<Burger>();
    } else {
      let index = this.currentUser.burgers.indexOf(burger);
      this.currentUser.burgers.splice(index, 1);
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
      duration: 2000,verticalPosition: 'top'
    });
  }
  public totapPrice() {
    let sum = 0;
    for (let i = 0; i < this.currentUser.burgers.length; i++) {
      sum = sum + this.currentUser.burgers[i].price;
    }
    return sum;
  }
  public confirmOrder() {
    this.currentUser.burgers = new Array();
    this.router.navigate(['/']);
  }
  ngOnInit() {}
}
