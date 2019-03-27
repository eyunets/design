import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

import { User } from 'src/app/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {}

  public getCurrentUser(): User {
    return this.currentUser;
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  logout() {
    this.authenticationService
      .logout()
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {}
      );
    this.router.navigate(['/home']);
  }
}
