import { Component, OnInit } from '@angular/core';
import {ComponentAbstractComponent} from "../component-abstract.component";

export abstract class ComponentAbstractBigEditorComponent  {
  public abstract setComponent(component: ComponentAbstractComponent): void;
  public abstract getComponent(): ComponentAbstractComponent;
}
