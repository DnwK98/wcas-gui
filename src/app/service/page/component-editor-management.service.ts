import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ComponentAbstractEditorComponent} from "../../components/component-abstract/component-abstract-editor/component-abstract-editor.component";
import {ComponentAbstractComponent} from "../../components/component-abstract/component-abstract.component";
import {PageComponent} from "../../layout/website/page/page.component";
import {ComponentAbstractBigEditorComponent} from "../../components/component-abstract/component-abstract-big-editor/component-abstract-big-editor.component";

@Injectable({
  providedIn: 'root'
})
export class ComponentEditorManagementService {

  editorWindow: ViewContainerRef | null = null;
  bigEditorWindow: ViewContainerRef | null = null;
  pageComponent: PageComponent | null = null;

  openedEditor: ComponentRef<ComponentAbstractEditorComponent> | null = null;

  constructor(private CFR: ComponentFactoryResolver) {
  }

  public openEditor(componentEditor: any, component: ComponentAbstractComponent) {
    this.closeEditor();
    if (this.pageComponent && componentEditor) {
      this.openedEditor = this.buildEditor(componentEditor);
      this.openedEditor?.instance.setComponent(component);
      this.pageComponent.editorOpened = true;
    }
  }

  public closeEditor() {
    this.closeBigEditor();
    this.openedEditor?.instance.close();
    this.editorWindow?.clear();
    if (this.pageComponent) {
      this.pageComponent.editorOpened = false;
    }
  }

  public openBigEditor(componentEditor: any, component: ComponentAbstractComponent) {
    this.closeBigEditor()
    if (this.pageComponent && componentEditor) {
      const editor = this.buildBigEditor(componentEditor);
      editor?.instance.setComponent(component);
      this.pageComponent.bigEditorOpened = true;
      console.log(this.pageComponent);
    }
  }

  public closeBigEditor() {
    if (this.pageComponent) {
      this.bigEditorWindow?.clear();
      this.pageComponent.bigEditorOpened = false;
    }
  }

  attachWindows(pageComponent: PageComponent, editorWindow: ViewContainerRef | null, bigEditorWindow: ViewContainerRef | null) {
    if (!editorWindow) {
      return;
    }
    if (this.editorWindow) {
      this.editorWindow.clear();
    }
    this.openedEditor = null;

    this.editorWindow = editorWindow;
    this.bigEditorWindow = bigEditorWindow;
    this.pageComponent = pageComponent;
  }

  private buildEditor(editorComponent: any) {
    if (!this.editorWindow) {
      return null;
    }
    return this.editorWindow.createComponent(
      this.CFR.resolveComponentFactory(editorComponent)
    ) as ComponentRef<ComponentAbstractEditorComponent>;
  }

  private buildBigEditor(editorComponent: any) {
    if (!this.bigEditorWindow) {
      return null;
    }
    return this.bigEditorWindow.createComponent(
      this.CFR.resolveComponentFactory(editorComponent)
    ) as ComponentRef<ComponentAbstractBigEditorComponent>;
  }

}

