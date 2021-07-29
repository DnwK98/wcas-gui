import { Component, OnInit } from '@angular/core';
import {DomainService, DomainVerificationDto} from "../../../service/domain/domain.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-domain-verification',
  templateUrl: './domain-verification.component.html',
  styleUrls: ['./domain-verification.component.scss']
})
export class DomainVerificationComponent implements OnInit {

  domainVerification: DomainVerificationDto|null = null;

  constructor(private domainService: DomainService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const that = this;
    this.route.params.subscribe(params => {
      this.domainService.getDomainVerification(params.id)
        .then(response => {
          that.domainVerification = response;
          console.log(this);
        });
    });
  }

}
