import {Component, ElementRef, OnInit} from '@angular/core';
import {ComponentAbstractComponent} from "../component-abstract/component-abstract.component";
import {ComponentHtmlEditorComponent} from "../component-html/component-html-editor/component-html-editor.component";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentImageEditorComponent} from "./component-image-editor/component-image-editor.component";

@Component({
  selector: 'app-component-image',
  templateUrl: './component-image.component.html',
  styleUrls: ['./component-image.component.scss']
})
export class ComponentImageComponent extends ComponentAbstractComponent{

  public image: string = '';

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService) {
    super(el, editorManager);
  }

  getDefinition(): object {
    return {
      name: 'ImageComponent',
      image: this.image,
    };
  }

  applyDefinition(definition: any): void {
    console.log(definition);
    this.image = definition.image;
  }

  getEditor(): any {
    return ComponentImageEditorComponent;
  }

}
