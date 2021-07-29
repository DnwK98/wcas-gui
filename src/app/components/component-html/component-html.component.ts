import {Component, Output, EventEmitter, HostListener, ElementRef} from '@angular/core';
import {ComponentAbstractComponent, DragData} from "../component-abstract/component-abstract.component";
import {ComponentHtmlEditorComponent} from "./component-html-editor/component-html-editor.component";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";

@Component({
  selector: 'app-component-html',
  templateUrl: './component-html.component.html',
  styleUrls: ['./component-html.component.scss']
})
export class ComponentHtmlComponent extends ComponentAbstractComponent{

  content: string = '';
  textAlign: string = 'left';

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService) {
    super(el, editorManager);
  }

  getDefinition(): object {
    return {
      name: 'HtmlComponent',
      content: this.content,
      textAlign: this.textAlign,
    };
  }

  applyDefinition(definition: any): void {
    console.log(definition);
    this.content = definition.content;
    this.textAlign = definition.textAlign;
  }

  getEditor(): any {
    return ComponentHtmlEditorComponent;
  }
}
