import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordVerify: string = '';
  errors: any = {};
  duringPasswordChange: boolean = false;

  constructor(private service: UserService, private popUp: ToastrService) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    const that = this;
    this.duringPasswordChange = true;
    this.service.changePassword(this.oldPassword, this.newPassword, this.newPasswordVerify)
      .then(() => {
        this.duringPasswordChange = false;
        that.errors = {};
        this.popUp.success('Successfully changed password', 'Success');
        that.oldPassword = that.newPassword = that.newPasswordVerify = '';
      })
      .catch(errorsResponse => {
        that.oldPassword = that.newPassword = that.newPasswordVerify = '';
        if (errorsResponse.error.errors) {
          that.errors = errorsResponse.error.errors;
        }
        this.duringPasswordChange = false;
      });
  }

}
