import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentAbstractComponent} from "../component-abstract/component-abstract.component";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-component-two-columns',
  templateUrl: './component-two-columns.component.html',
  styleUrls: ['./component-two-columns.component.scss']
})
export class ComponentTwoColumnsComponent extends ComponentAbstractComponent {

  @ViewChild("viewContainerRef1", {read: ViewContainerRef})
  VCR1: ViewContainerRef | null = null;

  @ViewChild("viewContainerRef2", {read: ViewContainerRef})
  VCR2: ViewContainerRef | null = null;

  column1: ComponentAbstractComponent | null = null;
  column2: ComponentAbstractComponent | null = null;

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService,
                     protected componentBuilder: ComponentBuilderService) {
    super(el, editorManager);
  }

  getDefinition(): object {
    return {
      name: "TwoColumnsComponent",
      column1: this.column1?.getDefinition(),
      column2: this.column2?.getDefinition()
    }
  }

  applyDefinition(definition: any): void {
    if (definition.column1) {
      this.setColumn(1, definition.column1);
    }
    if (definition.column2) {
      this.setColumn(2, definition.column2);
    }
  }

  setColumn(column: number, definition: any) {
    let that = this as any;
    let VCR: ViewContainerRef = that['VCR' + column];
    if (VCR) {
      // remove old component
      VCR.remove();

      // build
      let childComponentRef = this.componentBuilder.build(VCR, definition);

      if(childComponentRef?.instance){
        // Subscribe child events
        this.subscribeChildEvents(childComponentRef.instance);

        // add to column
        that['column' + column] = childComponentRef?.instance;
      }
    }
  }

  remove(component: ComponentAbstractComponent) {
    this.removeColumn(1, component);
    this.removeColumn(2, component);
  }

  removeColumn(column: number, component: ComponentAbstractComponent) {
    // find reference
    let that = this as any;
    if (that['column' + column] === component) {
      that['VCR' + column].remove();
      that['column' + column] = null;
    }
  }

  droppedColumn(event: CdkDragDrop<any>, column: number) {
    // event type should be CdkDragDrop<RemovableComponentsContainer> as in dropped but angular bugs
    this.dropped(event);
    this.setColumn(column, event.item.data.definition);
  }

  columnEmptyPredicate(column: number) {
    let that = this as any;
    return function () {
      return that['column' + column] === null;
    }
  }
}
