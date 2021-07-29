import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loggedIn: boolean | null = false;
  loading: boolean = false;
  email: string = '';
  password: string = '';
  passwordVerify: string = '';
  errors: any = {};

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  register(): void {
    const that = this;
    this.loading = true;
    this.authService.register(this.email, this.password, this.passwordVerify)
      .then(() => {
        that.errors = {};
        this.authService.login(this.email, this.password)
          .then(() => {
            this.authService.redirectToLogin();
          })
          .catch(() => {
            this.authService.redirectToLogin();
          });
      })
      .catch(errorsResponse => {
        that.password = '';
        that.passwordVerify = '';
        if (errorsResponse.error.errors) {
          that.errors = errorsResponse.error.errors;
        }
        this.loading = false;
      });
  }

}
