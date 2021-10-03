import {
  Component,
  ComponentRef, ElementRef, EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ComponentAbstractComponent,
  DragData,
  RemovableComponentsContainer
} from "../component-abstract/component-abstract.component";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {timer} from "rxjs";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentPageEditorComponent} from "./component-page-editor/component-page-editor.component";

@Component({
  selector: 'app-component-page',
  templateUrl: './component-page.component.html',
  styleUrls: ['./component-page.component.scss']
})
export class ComponentPageComponent extends ComponentAbstractComponent implements OnInit {
  @ViewChild("viewContainerRef", {read: ViewContainerRef})
  VCR: ViewContainerRef | null = null;

  title: string = '';
  backgroundColor: string = '#ffffff';
  textColor: string = '#000000';
  children: ComponentRef<ComponentAbstractComponent>[] = [];

  public constructor(el: ElementRef,
                     editorManager: ComponentEditorManagementService,
                     protected componentBuilder: ComponentBuilderService) {
    super(el, editorManager);
  }

  ngOnInit(): void {
  }

  getDefinition(): object {
    return {
      name: "PageComponent",
      title: this.title,
      backgroundColor: this.backgroundColor,
      textColor: this.textColor,
      children: this.children.map(childRef => childRef.instance.getDefinition())
    };
  }

  getEditor(): any {
    return ComponentPageEditorComponent;
  }

  applyDefinition(definition: any): void {
    for (let child of this.children) {
      this.remove(child.instance);
    }
    for (let child of definition.children) {
      this.add(child);
    }
    if(definition['title']) {
      this.title = definition['title'];
    }
    if(definition['backgroundColor']) {
      this.backgroundColor = definition['backgroundColor'];
    }
    if(definition['textColor']) {
      this.textColor = definition['textColor'];
    }
  }

  dropped(event: CdkDragDrop<any>) {
    super.dropped(event);
    this.add(event.item.data.definition);
  }

  remove(component: ComponentAbstractComponent) {
    console.log('remove', this, component);
    if (!this.VCR) {
      return;
    }
    // find reference
    let componentRef = this.children.filter(
      x => x.instance == component
    )[0];

    // remove component from VCR
    const vcrIndex = this.children.indexOf(componentRef);
    this.VCR.remove(vcrIndex);

    // remove component from the list
    this.children = this.children.filter(
      x => x.instance !== component
    );
  }

  add(definition: any) {
    if (!this.VCR) {
      return;
    }
    // render
    let childComponentRef = this.componentBuilder.build(this.VCR, definition);

    // add to children list
    if(childComponentRef && childComponentRef.instance) {
      this.subscribeChildEvents(childComponentRef.instance)
      this.children.push(childComponentRef);
    }
  }
}
