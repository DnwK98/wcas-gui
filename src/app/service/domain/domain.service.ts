import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private api: ApiService) {
  }

  public getDomains(): Promise<DomainDto[]> {
    return this.api.get<DomainDto[]>('/api/domain');
  }

  public getDomainVerification(id: string): Promise<DomainVerificationDto> {
    return this.api.get<DomainVerificationDto>('/api/domain/' + id + '/verification');
  }

  public create(domain: string): Promise<any> {
    return this.api.post<any>('/api/domain', {domain});
  }
}

export interface DomainDto {
  id: string;
  domain: string;
  created: string;
  isGlobal: boolean;
  isVerified: boolean;
}

export interface DomainVerificationDto {
  id: string;
  domain: string;
  isVerified: boolean;
  ipAddresses: string[];
}
