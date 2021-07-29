import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../environments/environment';
import {publish} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService, private popUp: ToastrService) {

  }

  public get<T>(path: string): Promise<T> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<any>(environment.apiUrl + path, {headers}).toPromise()
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(response => {
        if (401 === response.status){
          this.authService.verifyLoggedIn().then();
        }
        this.popUp.error('Unexpected error. Please try again');
        return Promise.reject(response);
      });
  }

  public post<T>(path: string, postParams: { [param: string]: string | string[]; }): Promise<T> {
    const params = new HttpParams()
      .appendAll(postParams);

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<T>(environment.apiUrl + path, params, {headers}).toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        if (401 === response.status){
          this.authService.verifyLoggedIn().then();
        }
        this.popUp.error('Unexpected error. Please try again', 'Error');
        return Promise.reject(response);
      });
  }

  public delete<T>(path: string): Promise<T> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.delete<T>(environment.apiUrl + path, {headers}).toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        if (401 === response.status){
          this.authService.verifyLoggedIn().then();
        }
        this.popUp.error('Unexpected error. Please try again', 'Error');
        return Promise.reject(response);
      });
  }


  public postJson<T>(path: string, json: any): Promise<T> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<any>(environment.apiUrl + path, json, {headers}).toPromise()
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(response => {
        if (401 === response.status){
          this.authService.verifyLoggedIn().then();
        }
        this.popUp.error('Unexpected error. Please try again', 'Error');
        return Promise.reject(response);
      });
  }

  public postJsonRaw(path: string, json: any): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post(environment.apiUrl + path, json, {headers, responseType: 'text'})
      .toPromise()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        if (401 === response.status){
          this.authService.verifyLoggedIn().then();
        }
        this.popUp.error('Unexpected error. Please try again', 'Error');
        return Promise.reject(response);
      });
  }
}

export interface CreatedResponse {
  id: string;
}
