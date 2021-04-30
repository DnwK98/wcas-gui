import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";

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
}

export interface WebsiteDto {
  url: string,
  id: string,
  created: string;
}

export interface WebsiteDetailsDto {
  url: string,
  id: string,
  created: string;
  pages: PageDto[]
}

export interface PageDto {
  id: string;
  path: string;
  created: string;
}
