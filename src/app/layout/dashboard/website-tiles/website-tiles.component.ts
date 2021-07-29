import { Component, OnInit } from '@angular/core';
import {WebsiteDto, WebsiteService} from "../../../service/website/website.service";

@Component({
  selector: 'app-website-tiles',
  templateUrl: './website-tiles.component.html',
  styleUrls: ['./website-tiles.component.scss']
})
export class WebsiteTilesComponent implements OnInit {

  websites: WebsiteDto[]|null = null;

  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.websiteService.getWebsites()
      .then(websites => {
        this.websites = websites;
      });
  }

}
