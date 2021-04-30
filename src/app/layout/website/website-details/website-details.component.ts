import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WebsiteDetailsDto, WebsiteService} from "../../../service/website/website.service";

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.scss']
})
export class WebsiteDetailsComponent implements OnInit {

  website: WebsiteDetailsDto|null = null;

  constructor(private router: Router,private route: ActivatedRoute, private websiteService: WebsiteService) {
    this.route.params.subscribe(params => {
      this.loadDetails(params['id']);
    })
  }

  ngOnInit(): void {
  }

  private loadDetails(id: string) {
    this.websiteService.getWebsite(id)
      .then(website => {
        this.website=website;
      })
      .catch(response => {
        if(404 === response.status){
          this.router.navigate(['not-found']);
        }
      });
  }

  edit(id: string) {
    if(!this.website){
      return;
    }
    this.router.navigate(['website', this.website.id, 'page', id])
  }
}
