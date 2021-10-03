import {Component, ElementRef, OnInit} from '@angular/core';
import {ComponentAbstractComponent} from "../component-abstract/component-abstract.component";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentImageEditorComponent} from "../component-image/component-image-editor/component-image-editor.component";
import {ComponentYoutubeEditorComponent} from "./component-youtube-editor/component-youtube-editor.component";

@Component({
  selector: 'app-component-youtube',
  templateUrl: './component-youtube.component.html',
  styleUrls: ['./component-youtube.component.scss']
})
export class ComponentYoutubeComponent extends ComponentAbstractComponent{

  public url: string = '';

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService) {
    super(el, editorManager);
  }

  getDefinition(): object {
    return {
      name: 'YouTubeComponent',
      url: this.url,
    };
  }

  applyDefinition(definition: any): void {
    this.url = definition.url;
  }

  getEditor(): any {
    return ComponentYoutubeEditorComponent;
  }

}
