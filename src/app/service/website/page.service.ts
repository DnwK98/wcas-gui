import {Injectable} from '@angular/core';
import {ApiService, CreatedResponse} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private api: ApiService) {
  }

  public getPageDetails(websiteId: string, pageId: string): Promise<PageDetailsDto> {
    return this.api.get<PageDetailsDto>('/api/website/' + websiteId + '/page/' + pageId);
  }

  public savePage(websiteId: string, page: PageDetailsDto): Promise<any> {
    return this.api.post<any>('/api/website/' + websiteId + '/page/' + page.id, {
      path: page.path,
      definition: JSON.stringify(page.definition),
    });
  }

  public createPage(id: string, newPath: string): Promise<CreatedResponse> {
    return this.api.post<any>('/api/website/' + id + '/page', {
      path: newPath,
      definition: JSON.stringify([]),
    });
  }

  public setPageStatus(websiteId: string, pageId: string, status: string): Promise<CreatedResponse> {
    return this.api.post<any>('/api/website/' + websiteId + '/page/' + pageId + '/status', {
      'status': status
    });
  }

  public deletePage(websiteId: string, pageId: string): Promise<any> {
    return this.api.delete<any>('/api/website/' + websiteId + '/page/' + pageId);
  }
}

export interface PageDetailsDto {
  id: string;
  path: string;
  definition: object;
  created: string;
}
