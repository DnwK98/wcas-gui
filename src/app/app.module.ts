import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './layout/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {
  CheckboxModule,
  WavesModule,
  ButtonsModule,
  InputsModule,
  IconsModule,
  CardsModule,
  CollapseModule
} from 'angular-bootstrap-md';
import {DashboardComponent} from './layout/dashboard/dashboard.component'
import {AuthService} from "./service/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {LayoutComponent} from './layout/layout.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {WebsiteTilesComponent} from './layout/dashboard/website-tiles/website-tiles.component';
import {WebsiteDetailsComponent} from './layout/website/website-details/website-details.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {LoadingComponent} from './layout/components/loading/loading.component';
import {PageComponent} from './layout/website/page/page.component';
import {ComponentPageComponent} from './components/component-page/component-page.component';
import {ComponentHtmlComponent} from './components/component-html/component-html.component';
import {ComponentThreeColumnsComponent} from './components/component-three-columns/component-three-columns.component';
import {ComponentHtmlEditorComponent} from './components/component-html/component-html-editor/component-html-editor.component';
import {ComponentPageEditorComponent} from './components/component-page/component-page-editor/component-page-editor.component';
import {ComponentsListComponent} from './layout/website/page/components-list/components-list.component';
import {ComponentEditorHeaderComponent} from './components/component-abstract/component-abstract-editor/component-editor-header/component-editor-header.component';
import {ColorPickerModule} from "ngx-color-picker";
import { ComponentHtmlBigEditorComponent } from './components/component-html/component-html-big-editor/component-html-big-editor.component';
import { ComponentBigEditorHeaderComponent } from './components/component-abstract/component-abstract-big-editor/component-big-editor-header/component-big-editor-header.component';
import { ComponentBackgroundImageComponent } from './components/component-background-image/component-background-image.component';
import { ComponentBackgroundImageEditorComponent } from './components/component-background-image/component-background-image-editor/component-background-image-editor.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import { ComponentMarginsComponent } from './components/component-margins/component-margins.component';
import { ComponentMarginsEditorComponent } from './components/component-margins/component-margins-editor/component-margins-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    NavbarComponent,
    WebsiteTilesComponent,
    WebsiteDetailsComponent,
    NotFoundComponent,
    LoadingComponent,
    PageComponent,
    ComponentPageComponent,
    ComponentHtmlComponent,
    ComponentThreeColumnsComponent,
    ComponentHtmlEditorComponent,
    ComponentPageEditorComponent,
    ComponentsListComponent,
    ComponentEditorHeaderComponent,
    ComponentHtmlBigEditorComponent,
    ComponentBigEditorHeaderComponent,
    ComponentBackgroundImageComponent,
    ComponentBackgroundImageEditorComponent,
    ComponentMarginsComponent,
    ComponentMarginsEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    ColorPickerModule,
    AngularEditorModule,
    // MDB
    MDBBootstrapModule.forRoot(),
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    CollapseModule,
    InputsModule,
    IconsModule,
    CardsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
