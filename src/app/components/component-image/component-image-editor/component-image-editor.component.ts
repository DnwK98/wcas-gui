import { Component, OnInit } from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentBackgroundImageComponent} from "../../component-background-image/component-background-image.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentImageComponent} from "../component-image.component";

@Component({
  selector: 'app-component-image-editor',
  templateUrl: './component-image-editor.component.html',
  styleUrls: ['./component-image-editor.component.scss']
})
export class ComponentImageEditorComponent extends ComponentAbstractEditorComponent{

  component: ComponentImageComponent | null = null;

  close(): void {
    if (this.component){
      this.component.isSelected = false;
    }
  }

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentImageComponent;
    this.component.isSelected = true;
  }

}
