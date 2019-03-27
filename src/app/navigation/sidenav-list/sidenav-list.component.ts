import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

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

  public onSidenavClose = () => {
    this.sidenavClose.emit();
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
    this.router.navigate(['/']);
  }
}
