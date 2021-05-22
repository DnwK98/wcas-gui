import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentAbstractComponent} from "../component-abstract/component-abstract.component";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ComponentBackgroundImageEditorComponent} from "./component-background-image-editor/component-background-image-editor.component";

@Component({
  selector: 'app-component-background-image',
  templateUrl: './component-background-image.component.html',
  styleUrls: ['./component-background-image.component.scss']
})
export class ComponentBackgroundImageComponent extends ComponentAbstractComponent {

  @ViewChild("viewContainerRef", {read: ViewContainerRef})
  VCR: ViewContainerRef | null = null;

  backgroundColor: string = "#ffffff";
  backgroundImage: string = "";
  content: ComponentAbstractComponent | null = null;

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService,
                     protected componentBuilder: ComponentBuilderService) {
    super(el, editorManager);
  }

  public getDefinition(): object {
    return {
      name: "BackgroundImageComponent",
      backgroundColor: this.backgroundColor,
      backgroundImage: this.backgroundImage,
      content: this.content?.getDefinition()
    }
  }

  public applyDefinition(definition: any) {
    if(definition.content) {
      this.setContent(definition.content);
    }
    if(definition.backgroundColor){
      this.backgroundColor = definition.backgroundColor;
    }
    if(definition.backgroundImage){
      this.backgroundImage = definition.backgroundImage;
    }
  }

  private setContent(definition: any) {
    if (this.VCR) {
      // remove old component
      this.VCR.remove();

      // build
      let childComponentRef = this.componentBuilder.build(this.VCR, definition);

      if (childComponentRef?.instance) {
        // Subscribe child events
        this.subscribeChildEvents(childComponentRef.instance)

        // add to column
        this.content = childComponentRef?.instance;
      }
    }
  }

  dropped(event: CdkDragDrop<any>) {
    super.dropped(event);
    this.setContent(event.item.data.definition);
  }

  remove(component: ComponentAbstractComponent) {
    let that = this as any;
    if(this.content === component){
      this.VCR?.remove();
      this.content = null;
    }
  }

  contentPredicate() {
    let that = this as any;
    return function () {
      return that.content === null;
    }
  }

  getEditor(): any {
    return ComponentBackgroundImageEditorComponent;
  }
}
