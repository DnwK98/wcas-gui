import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subscription} from "rxjs";
import {timer} from 'rxjs';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';
  userInfo: UserInfo | null = null;
  tokenRefresher: Subscription | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const fiveSeconds = 5000;
    const tenMinutes = 600000;
    this.tokenRefresher = timer(fiveSeconds, tenMinutes).subscribe(() => {
      this.refreshToken();
    });
  }

  public login(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .post<TokenResponse>(environment.apiUrl + '/api/auth/login', params, {headers: headers})
      .toPromise()
      .then(res => {
        this.setToken(res.token);
      });
  }

  public getUserInfo() {
    const that = this;
    return new Promise<UserInfo | null>((resolve, reject) => {
      if (null !== that.userInfo) {
        resolve(that.userInfo);
      }
      this.verifyLoggedIn()
        .then(() => {
          resolve(that.userInfo);
        })
        .catch(() => {
          reject(null);
        });
    })
  }

  public logout() {
    this.setToken('');
    this.redirectToLogin();
  }

  public verifyLoggedIn() {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.getToken());
    const that = this;
    return that.http
      .get<any>(environment.apiUrl + '/api/me', {headers: headers}).toPromise()
      .then(res => {
        that.userInfo = res;
      })
      .catch((res) => {
        if (this.tokenRefresher) {
          this.tokenRefresher.unsubscribe();
        }
        that.userInfo = null;
        that.setToken('');
        that.redirectToLogin();
        return Promise.reject(res);
      });
  }

  public redirectToLogin() {
    this.router.navigate(['login']);
  }

  public getToken() {
    if ('' !== this.token) {
      return this.token;
    }
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      return token;
    }

    return null;
  }

  private refreshToken() {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.getToken());
    this.http
      .post<TokenResponse>(environment.apiUrl + '/api/auth/refresh', null, {headers: headers})
      .toPromise()
      .then(res => {
        this.setToken(res.token);
      })
      .catch(() => {
        this.verifyLoggedIn().then();
      })
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }
}

export interface UserInfo {
  email: string;
}

interface TokenResponse {
  token: string
}
