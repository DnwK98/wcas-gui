import {Component, OnInit} from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentHtmlComponent} from "../component-html.component";

@Component({
  selector: 'app-component-html-editor',
  templateUrl: './component-html-editor.component.html',
  styleUrls: ['./component-html-editor.component.scss']
})
export class ComponentHtmlEditorComponent extends ComponentAbstractEditorComponent {

  component: ComponentHtmlComponent | null = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentHtmlComponent;
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
