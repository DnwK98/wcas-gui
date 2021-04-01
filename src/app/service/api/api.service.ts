import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  public get<T>(path: string): Promise<T> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get<any>(environment.apiUrl + path, {headers: headers}).toPromise()
      .then(response => {
        return Promise.resolve(response['data']);
      })
      .catch(response => {
        if(401 === response['status']){
          this.authService.verifyLoggedIn().then();
        }
        return Promise.reject(response);
      });
  }
  //
  // public post<T>(path: string, postParams: object): Promise<T> {
  //
  // }
  //
  // public postJson<T>(path: string, json: any): Promise<T> {
  //
  // }
}
