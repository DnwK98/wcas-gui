import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ComponentEditorManagementService} from "../../service/page/component-editor-management.service";
import {ComponentBuilderService} from "../../service/page-component/component-builder.service";

@Component({
  selector: 'app-component-abstract',
  templateUrl: './component-abstract.component.html',
  styleUrls: ['./component-abstract.component.scss']
})
export abstract class ComponentAbstractComponent implements RemovableComponentsContainer {
  isActive: boolean = false;

  @HostListener("click", ['$event'])
  onClickListener(event: MouseEvent) {
    // Check if this click event comes from this component or child
    for (let part of event.composedPath()) {
      let element = (part as Element);
      if (element.tagName && element.tagName.toLowerCase().includes("app-component")) {
        if (element.innerHTML === (this.el.nativeElement as Element).innerHTML) {
          this.onClick();
        } else {
          return;
        }
      }
    }

  }

  protected constructor(protected el: ElementRef, protected editorManager: ComponentEditorManagementService) {
  }

  static CONNECTED_DROP_LISTS: string[] = [];

  /**
   * Get Json definition required to build new component
   * while dragging or while load from API.
   */
  public abstract getDefinition(): object;

  /**
   * Apply JSON definition to component.
   * Applying full definition to PageComponent will build full site.
   *
   * @param definition
   */
  public abstract applyDefinition(definition: any): void;

  /**
   * Every component return it's editor to render on editorOpened event
   */
  public getEditor(): any {

  }

  public onClick(): any {
    this.editorManager.openEditor(this.getEditor(), this);
  }

  /**
   * In dynamically created components all events must be subscribed there
   */
  protected subscribeChildEvents(child: ComponentAbstractComponent) {

  }


  dropped(event: CdkDragDrop<RemovableComponentsContainer>) {
    event.previousContainer.data.removed(event);
  }

  removed(event: CdkDragDrop<RemovableComponentsContainer>): void {
    let data: DragData = event.item.data;
    this.remove(data.instance);
    this.editorManager.closeEditor();
  }

  remove(component: ComponentAbstractComponent): void {
    // implement remove logic for components which can have children
  }

  /**
   * Drop lists must be connected to each other.
   * Because of dynamic render there must be stored list of drop lists.
   */
  public dropListConnectedTo() {
    return ComponentAbstractComponent.CONNECTED_DROP_LISTS;
  }

  public falsePredicate() {
    return false;
  }

  public getDragData(): DragData {
    return {
      definition: this.getDefinition(),
      instance: this
    };
  }
}

export interface DragData {
  definition: object;
  instance: ComponentAbstractComponent;
}

export interface EditorOpenedEvent {
  editor: any,
  component: ComponentAbstractComponent
}

export interface RemovableComponentsContainer {
  /**
   * Lack of implemented event on remove.
   * Workaround with add method called in all drop events.
   *
   * @param event
   */
  removed(event: CdkDragDrop<RemovableComponentsContainer>): void;

  /**
   * Container must call removed on previous container like
   * event.previousContainer.data.removed(event);
   *
   * @param event
   */
  dropped(event: CdkDragDrop<RemovableComponentsContainer>): void;
}
