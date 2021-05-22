import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ComponentHtmlComponent} from "../../components/component-html/component-html.component";
import {ComponentPageComponent} from "../../components/component-page/component-page.component";
import {ComponentAbstractComponent} from "../../components/component-abstract/component-abstract.component";
import {ComponentThreeColumnsComponent} from "../../components/component-three-columns/component-three-columns.component";
import {ComponentBackgroundImageComponent} from "../../components/component-background-image/component-background-image.component";
import {ComponentMarginsComponent} from "../../components/component-margins/component-margins.component";

@Injectable({
  providedIn: 'root'
})
export class ComponentBuilderService {

  constructor(private CFR: ComponentFactoryResolver) { }

  public build(container: ViewContainerRef, definition: any): ComponentRef<ComponentAbstractComponent>|null {
    if(!definition.name){
      return null;
    }

    let componentClass = this.resolve(definition);

    if(!componentClass){
      return null;
    }

    // build and render component in container
    let component = container.createComponent(
      this.CFR.resolveComponentFactory(this.resolve(definition))
    ) as ComponentRef<ComponentAbstractComponent>;

    // apply definition
    setTimeout(() => component.instance.applyDefinition(definition), 50);

    return component;
  }

  public resolve(definition: any): any{
    switch (definition.name){
      case "BackgroundImageComponent": return ComponentBackgroundImageComponent;
      case "PageComponent": return ComponentPageComponent;
      case "HtmlComponent": return ComponentHtmlComponent;
      case "MarginsComponent": return ComponentMarginsComponent;
      case "ThreeColumnsComponent": return ComponentThreeColumnsComponent;
      default: return null;
    }
  }
}
