import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private api: ApiService) {
  }

  public getPageDetails(websiteId: string, pageId: string) {
    return this.api.get<PageDetailsDto>('/api/website/' + websiteId + '/page/' + pageId);
  }
}

export interface PageDetailsDto {
  id: string;
  path: string;
  definition: object;
  created: string;
}
