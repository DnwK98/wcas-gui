import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class PagePreviewService {

  constructor(private api: ApiService) {
  }

  public getPreview(definition: object) {
    return this.api.postJsonRaw('/api/page/preview', definition);
  }
}
