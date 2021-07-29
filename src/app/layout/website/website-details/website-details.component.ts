import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteDetailsDto, WebsiteService} from '../../../service/website/website.service';
import {PageService} from '../../../service/website/page.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.scss']
})
export class WebsiteDetailsComponent implements OnInit {

  website: WebsiteDetailsDto|null = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private websiteService: WebsiteService,
              private toastr: ToastrService) {
    this.route.params.subscribe(params => {
      this.loadDetails(params.id);
    });
  }

  ngOnInit(): void {
  }

  private loadDetails(id: string): void {
    this.websiteService.getWebsite(id)
      .then(website => {
        this.website = website;
      })
      .catch(response => {
        if (404 === response.status){
          this.router.navigate(['not-found']);
        }
      });
  }

  setStatus(status: string): void {
    if (!this.website){
      return;
    }
    this.websiteService.changeStatus(this.website.id, status)
      .then(() => {
        if (this.website) {
          this.website.status = status;
          this.toastr.success('Set status: ' + status, 'Success');
        }
      });
  }

  delete(): void {
    if (this.website && confirm('Do you really want to delete website?')) {
      this.websiteService.delete(this.website.id)
        .then(() => {
          this.router.navigate(['']);
          this.toastr.success('Deleted website', 'Success');
        });
    }
  }
}
