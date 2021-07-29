import {Component, OnInit} from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentHtmlComponent} from "../component-html.component";
import {ComponentEditorManagementService} from "../../../service/page/component-editor-management.service";
import {ComponentHtmlBigEditorComponent} from "../component-html-big-editor/component-html-big-editor.component";

@Component({
  selector: 'app-component-html-editor',
  templateUrl: './component-html-editor.component.html',
  styleUrls: ['./component-html-editor.component.scss']
})
export class ComponentHtmlEditorComponent extends ComponentAbstractEditorComponent {

  component: ComponentHtmlComponent | null = null;

  constructor(private editorManager: ComponentEditorManagementService) {
    super();
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentHtmlComponent;
    this.component.isSelected = true;
  }

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  close(): void {
    if (this.component){
      this.component.isSelected = false;
    }
  }

  onOpenBig(): void {
    if (this.component) {
      this.editorManager.openBigEditor(ComponentHtmlBigEditorComponent, this.component);
    }
  }

}
