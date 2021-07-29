import {Component, Input, OnInit} from '@angular/core';
import {PageDto, WebsiteDto} from "../../../../service/website/website.service";
import {Router} from "@angular/router";
import {PageService} from "../../../../service/website/page.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-page-tile',
  templateUrl: './page-tile.component.html',
  styleUrls: ['./page-tile.component.scss']
})
export class PageTileComponent implements OnInit {

  @Input()
  page: PageDto|null = null;

  @Input()
  website: WebsiteDto|null = null;

  constructor(private router: Router, private pageService: PageService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  edit(id: string): void {
    if (!this.website){
      return;
    }
    this.router.navigate(['website', this.website.id, 'page', id]).then();
  }

  setStatus(status: string): void {
    if (!this.website || !this.page){
      return;
    }
    this.pageService.setPageStatus(this.website.id, this.page.id, status)
       .then(() => {
         if (this.page) {
           this.page.status = status;
           this.toastr.success('Set status: ' + status, 'Success');
         }
       });
  }

  delete(): void {
    if (!this.website || !this.page){
      return;
    }
    if (confirm('Do you really want to delete this page?')) {
      this.pageService.deletePage(this.website.id, this.page.id)
        .then(() => {
          this.page = null;
          this.toastr.success('Deleted page', 'Success');
        });
    }
  }

}
