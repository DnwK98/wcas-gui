import { Component, OnInit } from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentPageComponent} from "../component-page.component";
import {ComponentHtmlComponent} from "../../component-html/component-html.component";

@Component({
  selector: 'app-component-page-editor',
  templateUrl: './component-page-editor.component.html',
  styleUrls: ['./component-page-editor.component.scss']
})
export class ComponentPageEditorComponent extends ComponentAbstractEditorComponent{

  component: ComponentPageComponent | null = null;

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentPageComponent;
    this.component.isActive = true;
  }

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  close(): void {
    if(this.component){
      this.component.isActive = false;
    }
  }


}
