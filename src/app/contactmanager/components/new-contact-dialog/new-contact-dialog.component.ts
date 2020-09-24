import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  user: User;
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
  ) {}

  name = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.user = new User();
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }
  }

  save(): void {
    console.log('save contact');
    this.userService.addUser(this.user).then((user) => {
      this.dialogRef.close(this.user);
    });
  }

  dismiss(): void {
    console.log('dismiss contact');
    this.dialogRef.close(null);
  }
}
