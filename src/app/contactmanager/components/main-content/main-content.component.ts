import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private service: UserService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params.id;
      if (!id) {
        id = 1; // display first contact
      }
      this.user = null; // to allow spinner to trigger

      this.service.users.subscribe((users) => {
        if (users.length === 0) {
          return;
        }
        // this is just to see the spinner for a bit
        setTimeout(() => {
          this.user = this.service.userById(id);
        }, 500);
      });
    });
  }
}
