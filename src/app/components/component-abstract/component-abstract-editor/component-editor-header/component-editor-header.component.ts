import {Component, Input, OnInit} from '@angular/core';
import {ComponentEditorManagementService} from '../../../../service/page/component-editor-management.service';

@Component({
  selector: 'app-component-editor-header',
  templateUrl: './component-editor-header.component.html',
  styleUrls: ['./component-editor-header.component.scss']
})
export class ComponentEditorHeaderComponent implements OnInit {

  @Input() editorName: string = '';

  constructor(private editorManager: ComponentEditorManagementService) { }

  ngOnInit(): void {
  }

  public clickClose(): void {
    this.editorManager.closeEditor();
  }

}
