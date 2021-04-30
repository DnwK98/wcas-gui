import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../components/component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../components/component-abstract/component-abstract.component";
import {ComponentsListComponent} from "../../layout/website/page/components-list/components-list.component";
import {PageComponent} from "../../layout/website/page/page.component";

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorManagementService {

  editorWindow: ViewContainerRef | null = null;
  pageComponent: PageComponent | null = null;

  openedEditor: ComponentRef<ComponentAbstractEditorComponent> | null = null;

  constructor(private CFR: ComponentFactoryResolver) {
  }

  public openEditor(componentEditor: any, component: ComponentAbstractComponent) {
    this.closeEditor();
    if(this.pageComponent && componentEditor) {
      this.openedEditor = this.buildEditor(componentEditor);
      this.openedEditor?.instance.setComponent(component);
      this.pageComponent.editorOpened = true;
    }
  }

  public closeEditor() {
    this.openedEditor?.instance.close();
    this.editorWindow?.clear();
    if(this.pageComponent){
      this.pageComponent.editorOpened = false;
    }
  }

  attachWindows(pageComponent: PageComponent,editorWindow: ViewContainerRef|null) {
    if(!editorWindow){
      return;
    }
    if(this.editorWindow){
      this.editorWindow.clear();
    }
    this.openedEditor = null;

    this.editorWindow = editorWindow;
    this.pageComponent = pageComponent;
  }

  private buildEditor(editorComponent: any) {
    if(!this.editorWindow){
      return null;
    }
    return this.editorWindow.createComponent(
      this.CFR.resolveComponentFactory(editorComponent)
    )as ComponentRef<ComponentAbstractEditorComponent>;
  }

}

