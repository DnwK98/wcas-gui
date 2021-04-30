import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ComponentAbstractComponent,
  DragData,
  RemovableComponentsContainer
} from "../component-abstract/component-abstract.component";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";

@Component({
  selector: 'app-component-three-columns',
  templateUrl: './component-three-columns.component.html',
  styleUrls: ['./component-three-columns.component.scss']
})
export class ComponentThreeColumnsComponent extends ComponentAbstractComponent {

  @ViewChild("viewContainerRef1", {read: ViewContainerRef})
  VCR1: ViewContainerRef | null = null;

  @ViewChild("viewContainerRef2", {read: ViewContainerRef})
  VCR2: ViewContainerRef | null = null;

  @ViewChild("viewContainerRef3", {read: ViewContainerRef})
  VCR3: ViewContainerRef | null = null;

  column1: ComponentAbstractComponent | null = null;
  column2: ComponentAbstractComponent | null = null;
  column3: ComponentAbstractComponent | null = null;

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService,
                     protected componentBuilder: ComponentBuilderService) {
    super(el, editorManager);
  }

  getDefinition(): object {
    return {
      name: "ThreeColumnsComponent",
      column1: this.column1?.getDefinition(),
      column2: this.column2?.getDefinition(),
      column3: this.column3?.getDefinition(),
    }
  }

  applyDefinition(definition: any): void {
    if (definition.column1) {
      this.setColumn(1, definition.column1);
    }
    if (definition.column2) {
      this.setColumn(2, definition.column2);
    }
    if (definition.column3) {
      this.setColumn(3, definition.column3);
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
        this.subscribeChildEvents(childComponentRef.instance)

        // add to column
        that['column' + column] = childComponentRef?.instance;
      }
    }
  }

  remove(component: ComponentAbstractComponent) {
    this.removeColumn(1, component);
    this.removeColumn(2, component);
    this.removeColumn(3, component);
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
