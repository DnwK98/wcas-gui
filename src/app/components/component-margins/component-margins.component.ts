import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentAbstractComponent} from "../component-abstract/component-abstract.component";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ComponentMarginsEditorComponent} from "./component-margins-editor/component-margins-editor.component";

@Component({
  selector: 'app-component-margins',
  templateUrl: './component-margins.component.html',
  styleUrls: ['./component-margins.component.scss']
})
export class ComponentMarginsComponent extends ComponentAbstractComponent {

  @ViewChild("viewContainerRef", {read: ViewContainerRef})
  VCR: ViewContainerRef | null = null;

  marginTop: string = 'none';
  marginBottom: string = 'none';
  marginLeftRight: string = 'none';
  content: ComponentAbstractComponent | null = null;

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService,
                     protected componentBuilder: ComponentBuilderService) {
    super(el, editorManager);
  }

  public getDefinition(): object {
    return {
      name: "MarginsComponent",
      marginTop: this.marginTop,
      marginBottom: this.marginBottom,
      marginLeftRight: this.marginLeftRight,
      content: this.content?.getDefinition()
    }
  }

  public applyDefinition(definition: any) {
    if (definition.content) {
      this.setContent(definition.content);
    }
    if(definition.marginTop){
      this.marginTop = definition.marginTop;
    }
    if(definition.marginBottom){
      this.marginBottom = definition.marginBottom;
    }
    if(definition.marginLeftRight){
      this.marginLeftRight = definition.marginLeftRight;
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
    if (this.content === component) {
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
    return ComponentMarginsEditorComponent;
  }
}
