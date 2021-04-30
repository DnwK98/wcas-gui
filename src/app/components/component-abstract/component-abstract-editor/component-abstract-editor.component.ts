import {ComponentAbstractComponent} from "../component-abstract.component";

export abstract class ComponentAbstractEditorComponent {
  public abstract close(): void;
  public abstract setComponent(component: ComponentAbstractComponent): void;
  public abstract getComponent(): ComponentAbstractComponent;
}
