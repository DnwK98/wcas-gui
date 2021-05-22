import {Component, Input, OnInit} from '@angular/core';
import {ComponentEditorManagementService} from "../../../../service/page/component-editor-management.service";

@Component({
  selector: 'app-component-big-editor-header',
  templateUrl: './component-big-editor-header.component.html',
  styleUrls: ['./component-big-editor-header.component.scss']
})
export class ComponentBigEditorHeaderComponent implements OnInit {

  @Input() editorName: string = '';

  constructor(private editorManager: ComponentEditorManagementService) { }

  ngOnInit(): void {
  }

  clickClose() {
    this.editorManager.closeBigEditor();
  }

}
