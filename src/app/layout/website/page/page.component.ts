import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageDetailsDto, PageService} from "../../../service/website/page.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PagePreviewService} from "../../../service/website/page-preview.service";
import {Subscription, timer} from "rxjs";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {
  ComponentAbstractComponent, EditorOpenedEvent,
  RemovableComponentsContainer
} from "../../../components/component-abstract/component-abstract.component";
import {ComponentPageComponent} from "../../../components/component-page/component-page.component";
import {ComponentAbstractEditorComponent} from "../../../components/component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentEditorManagementService} from "../../../service/page/component-editor-management.service";
import {ComponentsListComponent} from "./components-list/components-list.component";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  @ViewChild("editorWindow", {read: ViewContainerRef})
  editorWindow: ViewContainerRef | null = null;

  @ViewChild('pageView')
  pageView: ComponentPageComponent | null = null;

  previewIframe: any;
  page: PageDetailsDto | null = null;
  timer: Subscription | null = null;

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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadPage(params['websiteId'], params['pageId']);
    })
    setTimeout(() => this.timer = timer(100, 1000).subscribe(() => {
      this.refreshConnectedDropLists();
      this.refreshPreview();
    }), 2000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }

  private loadPage(websiteId: string, pageId: string) {
    this.pageService.getPageDetails(websiteId, pageId)
      .then(page => {
        this.page = page;
        setTimeout(() => {
          this.editorManager.attachWindows(this, this.editorWindow);
          this.pageView?.applyDefinition(page.definition)
        }, 100)
      })
      .catch(response => {
        if (404 === response['status']) {
          this.router.navigate(['not-found']).then();
        }
      })
  }

  private refreshPreview() {
    let definition = this.pageView?.getDefinition();
    if (!definition || !this.page) {
      return;
    }

    if (JSON.stringify(this.page.definition) !== JSON.stringify(definition)) {
      this.page.definition = definition

      this.previewService.getPreview(definition)
        .then(response => {
          this.previewIframe = this.domSanitizer.bypassSecurityTrustHtml(response);
        });
    }
  }

  private refreshConnectedDropLists() {
    let a = this.element.nativeElement.querySelectorAll('.drop-list-zone');
    let ids = [];
    for (let el of a) {
      ids.push(el.getAttribute('id'));
    }
    ComponentAbstractComponent.CONNECTED_DROP_LISTS = ids;
  }
}
