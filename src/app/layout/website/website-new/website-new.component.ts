import {Component, OnInit} from '@angular/core';
import {Select2OptionData} from 'ng-select2';
import {DomainService} from '../../../service/domain/domain.service';
import {WebsiteService} from "../../../service/website/website.service";
import {Router} from "@angular/router";
import {CreatedResponse} from "../../../service/api/api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.scss']
})
export class WebsiteNewComponent implements OnInit {

  loading: boolean = false;
  url: string = '';
  errors: any = [];
  domain: string|null = null;
  domainValue: string = '';

  select2Data: Select2OptionData[] = [];

  constructor(private router: Router,
              private domainService: DomainService,
              private websiteService: WebsiteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadDomains();
  }

  create(): void {
    this.loading = true;
    (this.websiteService.create(this.url + '.' + this.domain) as Promise<CreatedResponse>)
      .then((response) => {
        this.router.navigate(['/website/' + response.id]);
        this.toastr.success('Created website', 'Success');
      })
      .catch((response) => {
        this.errors = response?.error?.errors ?? [];
        this.loading = false;
      });
  }

  loadDomains(): void {
    this.domainService.getDomains()
      .then((response) => {
        const items: Select2OptionData[] = [];
        response.forEach((el) => {
          if (el.isVerified) {
            if (null === this.domain) {
              this.domain = this.domainValue = el.domain;
            }
            items.push({id: el.domain, text: el.domain});
          }
        });

        this.select2Data = items;
      });
  }

}
