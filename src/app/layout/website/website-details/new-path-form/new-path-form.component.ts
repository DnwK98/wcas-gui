import {Component, Input, OnInit} from '@angular/core';
import {WebsiteDto} from "../../../../service/website/website.service";
import {PageService} from "../../../../service/website/page.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-path-form',
  templateUrl: './new-path-form.component.html',
  styleUrls: ['./new-path-form.component.scss']
})
export class NewPathFormComponent implements OnInit {

  @Input()
  website: WebsiteDto|null = null;

  newPath: string = '';
  newPathError: string = '';

  constructor(private router: Router, private pageService: PageService,  private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  createPage(): void {
    if (!this.website){
      return;
    }
    const website = this.website;

    this.pageService.createPage(this.website.id, this.newPath)
      .then((createdResponse) => {
        this.router.navigate(['website', website.id, 'page', createdResponse.id]).then();
        this.toastr.success('Created page', 'Success');
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
        const error = errorResponse?.error?.errors?.path;
        if (error) {
          this.newPathError = error;
        }
      });
  }

}
