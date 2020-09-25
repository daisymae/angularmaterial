import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  users: Observable<User[]>;
  isDarkTheme = false;
  direction = 'ltr';

  constructor(private router: Router, private userService: UserService) {}

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit(): void {
    this.users = this.userService.users;
    this.userService.loadAll();

    // no longer needed when we set the id in content
    // this.users.subscribe((data) => {
    //   // console.log(data);
    //   if (data.length > 0) {
    //     this.router.navigate(['/contactmanager', data[0].id]);
    //   }
    // });

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
    // in Angular 5 - ? [but not in 9], the sidebar had to be toggled when the direction changed
    // this is how to do that:
    // this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
