import { Component, OnInit } from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentHtmlComponent} from "../../component-html/component-html.component";
import {ComponentEditorManagementService} from "../../../service/page/component-editor-management.service";
import {ComponentHtmlBigEditorComponent} from "../../component-html/component-html-big-editor/component-html-big-editor.component";
import {ComponentMarginsComponent} from "../component-margins.component";

@Component({
  selector: 'app-component-margins-editor',
  templateUrl: './component-margins-editor.component.html',
  styleUrls: ['./component-margins-editor.component.scss']
})
export class ComponentMarginsEditorComponent extends ComponentAbstractEditorComponent {

  component: ComponentMarginsComponent | null = null;
  marginSizes = [
    'none',
    'small',
    'medium',
    'big'
  ];
  marginSizesSelect = [
    {id: 'none', text: 'None'},
    {id: 'small', text: 'Small'},
    {id: 'medium', text: 'Medium'},
    {id: 'big', text: 'Big'},
  ];

  constructor(private editorManager: ComponentEditorManagementService) {
    super();
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentMarginsComponent;
    this.component.isSelected = true;
  }

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  close(): void {
    if(this.component){
      this.component.isSelected = false;
    }
  }

  onOpenBig() {
    if(this.component) {
      this.editorManager.openBigEditor(ComponentHtmlBigEditorComponent, this.component);
    }
  }


}
