import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageDetailsDto, PageService} from "../../../service/website/page.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PagePreviewService} from "../../../service/website/page-preview.service";
import {Subscription, timer} from "rxjs";
import {ComponentAbstractComponent} from "../../../components/component-abstract/component-abstract.component";
import {ComponentPageComponent} from "../../../components/component-page/component-page.component";
import {ComponentEditorManagementService} from "../../../service/page/component-editor-management.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  @ViewChild('editorWindow', {read: ViewContainerRef})
  editorWindow: ViewContainerRef | null = null;

  @ViewChild('bigEditorWindow', {read: ViewContainerRef})
  bigEditorWindow: ViewContainerRef | null = null;

  @ViewChild('pageView')
  pageView: ComponentPageComponent | null = null;

  previewIframe: any;
  page: PageDetailsDto | null = null;
  timer: Subscription | null = null;
  websiteId: string = '';
  pageId: string = '';

  editorOpened: boolean = false;
  bigEditorOpened: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pageService: PageService,
              private domSanitizer: DomSanitizer,
              private previewService: PagePreviewService,
              private element: ElementRef,
              private editorManager: ComponentEditorManagementService) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPage(params['websiteId'], params['pageId']);
    });
    setTimeout(() => this.timer = timer(100, 1000).subscribe(() => {
      this.refreshConnectedDropLists();
      this.refreshPreview();
    }), 2000);
  }

  public ngOnDestroy(): void {
    setTimeout(() => {
      if (this.timer) {
        this.timer.unsubscribe();
      }
      ComponentAbstractComponent.CONNECTED_DROP_LISTS = [];
    }, 2000);
  }

  public onSave(): void {
    const page = this.page as PageDetailsDto;
    this.page = null;
    this.pageService.savePage(this.websiteId, page)
      .then(() => {
        this.router.navigate(['/website/' + this.websiteId]);
      })
      .finally(() => this.page = page);
  }

  public onCancel(): void {
    this.router.navigate(['/website/' + this.websiteId]);
  }

  private loadPage(websiteId: string, pageId: string): void {
    this.pageService.getPageDetails(websiteId, pageId)
      .then(page => {
        this.page = page;
        this.websiteId = websiteId;
        this.pageId = pageId;
        setTimeout(() => {
          this.editorManager.attachWindows(this, this.editorWindow, this.bigEditorWindow);
          this.pageView?.applyDefinition(page.definition);
        }, 100);
      })
      .catch(response => {
        if (404 === response['status']) {
          this.router.navigate(['not-found']).then();
        }
      });
  }

  private refreshPreview(): void {
    const definition = this.pageView?.getDefinition();
    if (!definition || !this.page) {
      return;
    }

    if (JSON.stringify(this.page.definition) !== JSON.stringify(definition)) {
      this.page.definition = definition;

      this.previewService.getPreview(definition)
        .then(response => {
          this.previewIframe = this.domSanitizer.bypassSecurityTrustHtml(response);
        });
    }
  }

  private refreshConnectedDropLists(): void {
    const a = this.element.nativeElement.querySelectorAll('.drop-list-zone');
    const ids = [];
    for (const el of a) {
      ids.push(el.getAttribute('id'));
    }
    ComponentAbstractComponent.CONNECTED_DROP_LISTS = ids;
  }
}
