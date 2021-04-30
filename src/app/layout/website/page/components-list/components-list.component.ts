import { Component, OnInit } from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {
  ComponentAbstractComponent,
  RemovableComponentsContainer
} from "../../../../components/component-abstract/component-abstract.component";

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.scss']
})
export class ComponentsListComponent implements RemovableComponentsContainer{

  constructor() { }


  removed(event: CdkDragDrop<any>) {
    // don't remove components from editor window
  }

  dropped(event: CdkDragDrop<any>) {
    // Remove component if dropped on components list
    event.previousContainer.data.removed(event);
  }

  dropListConnectedTo() {
    return ComponentAbstractComponent.CONNECTED_DROP_LISTS;
  }

}
