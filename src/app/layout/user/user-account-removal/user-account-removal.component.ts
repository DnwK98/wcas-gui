import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-user-account-removal',
  templateUrl: './user-account-removal.component.html',
  styleUrls: ['./user-account-removal.component.scss']
})
export class UserAccountRemovalComponent implements OnInit {

  constructor(private service: UserService, private popUp: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  deleteAccount(): void {
    if (confirm('Do you really want to delete your account?')) {
      this.service.removeAccount().then(() => {
        this.authService.logout();
      });
    }
  }
}
