import { Component, OnInit } from '@angular/core';
import {ComponentAbstractBigEditorComponent} from "../../component-abstract/component-abstract-big-editor/component-abstract-big-editor.component";
import {ComponentAbstractComponent} from "../../component-abstract/component-abstract.component";
import {ComponentHtmlComponent} from "../component-html.component";
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'app-component-html-big-editor',
  templateUrl: './component-html-big-editor.component.html',
  styleUrls: ['./component-html-big-editor.component.scss']
})
export class ComponentHtmlBigEditorComponent extends ComponentAbstractBigEditorComponent{

  component: ComponentHtmlComponent | null = null;

  editorConfig: AngularEditorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
      ],
      [
        'insertImage',
        'insertVideo',
      ]
    ]
  };

  getComponent(): ComponentAbstractComponent {
    return this.component as ComponentAbstractComponent;
  }

  setComponent(component: ComponentAbstractComponent): void {
    this.component = component as ComponentHtmlComponent;
  }

}
