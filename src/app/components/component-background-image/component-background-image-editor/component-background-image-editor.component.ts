import { Component, OnInit } from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentBackgroundImageComponent} from "../component-background-image.component";

@Component({
  selector: 'app-component-background-image-editor',
  templateUrl: './component-background-image-editor.component.html',
  styleUrls: ['./component-background-image-editor.component.scss']
})
export class ComponentBackgroundImageEditorComponent extends ComponentAbstractEditorComponent{

  component: ComponentBackgroundImageComponent | null = null;

  close(): void {
    if (this.component){
      this.component.isSelected = false;
    }
  }

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentBackgroundImageComponent;
    this.component.isSelected = true;
  }

}
