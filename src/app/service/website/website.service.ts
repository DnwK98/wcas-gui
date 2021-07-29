import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private api: ApiService) {

  }

  public getWebsites(): Promise<WebsiteDto[]> {
    return this.api.get<WebsiteDto[]>('/api/website');
  }

  public getWebsite(id: string): Promise<WebsiteDetailsDto> {
    return this.api.get<WebsiteDetailsDto>('/api/website/' + id);
  }

  public create(url: string): Promise<any> {
    return this.api.post<any>('/api/website', {url});
  }

  public changeStatus(id: string, status: string): Promise<any> {
    return this.api.post<any>('/api/website/' + id + '/status', {status});
  }

  public delete(id: string): Promise<any> {
    return this.api.delete<any>('/api/website/' + id);
  }
}

export interface WebsiteDto {
  url: string;
  id: string;
  status: string;
  created: string;
}

export interface WebsiteDetailsDto {
  url: string;
  id: string;
  status: string;
  created: string;
  pages: PageDto[];
}

export interface PageDto {
  id: string;
  path: string;
  status: string;
  created: string;
}
