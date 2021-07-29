import { Component, OnInit } from '@angular/core';
import {DomainDto, DomainService} from '../../../service/domain/domain.service';

@Component({
  selector: 'app-domains-list',
  templateUrl: './domains-list.component.html',
  styleUrls: ['./domains-list.component.scss']
})
export class DomainsListComponent implements OnInit {

  domains: DomainDto[] = [];

  constructor(private domainService: DomainService) { }

  ngOnInit(): void {
    this.domainService.getDomains()
      .then(response => {
        this.domains = response;
      });
  }

}
