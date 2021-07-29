import { Component, OnInit } from '@angular/core';
import {CreatedResponse} from "../../../service/api/api.service";
import {DomainService} from "../../../service/domain/domain.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-domain-new',
  templateUrl: './domain-new.component.html',
  styleUrls: ['./domain-new.component.scss']
})
export class DomainNewComponent implements OnInit {

  loading: boolean = false;
  domain: string = '';
  errors: any = [];

  constructor(private router: Router, private toastr: ToastrService, private domainService: DomainService) { }

  ngOnInit(): void {
  }

  create(): void {
    this.loading = true;
    (this.domainService.create(this.domain) as Promise<CreatedResponse>)
      .then((response) => {
        this.router.navigate(['/domain/' + response.id + '/verification']);
        this.toastr.success('Created domain', 'Success');
      })
      .catch((response) => {
        console.log(response);
        this.errors = response?.error?.errors ?? [];
        this.loading = false;
      });
  }
}
