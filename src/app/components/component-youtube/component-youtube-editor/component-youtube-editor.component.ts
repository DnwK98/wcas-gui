import { Component, OnInit } from '@angular/core';
import {ComponentImageComponent} from "../../component-image/component-image.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentAbstractEditorComponent} from "../../component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentYoutubeComponent} from "../component-youtube.component";

@Component({
  selector: 'app-component-youtube-editor',
  templateUrl: './component-youtube-editor.component.html',
  styleUrls: ['./component-youtube-editor.component.scss']
})
export class ComponentYoutubeEditorComponent extends ComponentAbstractEditorComponent {

  component: ComponentYoutubeComponent | null = null;

  close(): void {
    if (this.component){
      this.component.isSelected = false;
    }
  }

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentYoutubeComponent;
    this.component.isSelected = true;
  }

}
