import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './layout/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  ButtonsModule,
  CardsModule,
  CheckboxModule,
  CollapseModule,
  IconsModule,
  InputsModule,
  MDBBootstrapModule,
  WavesModule
} from 'angular-bootstrap-md';
import {NgSelect2Module} from 'ng-select2';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {AuthService} from './service/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
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
import {ColorPickerModule} from 'ngx-color-picker';
import {ComponentHtmlBigEditorComponent} from './components/component-html/component-html-big-editor/component-html-big-editor.component';
import {ComponentBigEditorHeaderComponent} from './components/component-abstract/component-abstract-big-editor/component-big-editor-header/component-big-editor-header.component';
import {ComponentBackgroundImageComponent} from './components/component-background-image/component-background-image.component';
import {ComponentBackgroundImageEditorComponent} from './components/component-background-image/component-background-image-editor/component-background-image-editor.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {ComponentMarginsComponent} from './components/component-margins/component-margins.component';
import {ComponentMarginsEditorComponent} from './components/component-margins/component-margins-editor/component-margins-editor.component';
import {RegisterComponent} from './layout/register/register.component';
import {WebsiteNewComponent} from './layout/website/website-new/website-new.component';
import {NewPathFormComponent} from './layout/website/website-details/new-path-form/new-path-form.component';
import {PageTileComponent} from './layout/website/website-details/page-tile/page-tile.component';
import {ToastrModule} from 'ngx-toastr';
import { ComponentHtmlPreviewComponent } from './components/component-html/component-html-preview/component-html-preview.component';
import { ComponentMarginsPreviewComponent } from './components/component-margins/component-margins-preview/component-margins-preview.component';
import {ComponentBackgroundImagePreviewComponent} from './components/component-background-image/component-background-image-preview/component-background-image-preview.component';
import { ComponentThreeColumnsPreviewComponent } from './components/component-three-columns/component-three-columns-preview/component-three-columns-preview.component';
import { ComponentImageComponent } from './components/component-image/component-image.component';
import { ComponentImagePreviewComponent } from './components/component-image/component-image-preview/component-image-preview.component';
import { ComponentImageEditorComponent } from './components/component-image/component-image-editor/component-image-editor.component';
import { DomainsListComponent } from './layout/domain/domains-list/domains-list.component';
import { DomainNewComponent } from './layout/domain/domain-new/domain-new.component';
import { DomainVerificationComponent } from './layout/domain/domain-verification/domain-verification.component';
import { UserComponent } from './layout/user/user.component';
import { UserPasswordComponent } from './layout/user/user-password/user-password.component';
import { UserAccountRemovalComponent } from './layout/user/user-account-removal/user-account-removal.component';
import { ComponentYoutubeComponent } from './components/component-youtube/component-youtube.component';
import { ComponentYoutubePreviewComponent } from './components/component-youtube/component-youtube-preview/component-youtube-preview.component';
import { ComponentYoutubeEditorComponent } from './components/component-youtube/component-youtube-editor/component-youtube-editor.component';
import { ComponentTwoColumnsComponent } from './components/component-two-columns/component-two-columns.component';
import { ComponentTwoColumnsPreviewComponent } from './components/component-two-columns/component-two-columns-preview/component-two-columns-preview.component';

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
    RegisterComponent,
    WebsiteNewComponent,
    NewPathFormComponent,
    PageTileComponent,
    ComponentHtmlPreviewComponent,
    ComponentMarginsPreviewComponent,
    ComponentBackgroundImagePreviewComponent,
    ComponentThreeColumnsPreviewComponent,
    ComponentImageComponent,
    ComponentImagePreviewComponent,
    ComponentImageEditorComponent,
    DomainsListComponent,
    DomainNewComponent,
    DomainVerificationComponent,
    UserComponent,
    UserPasswordComponent,
    UserAccountRemovalComponent,
    ComponentYoutubeComponent,
    ComponentYoutubePreviewComponent,
    ComponentYoutubeEditorComponent,
    ComponentTwoColumnsComponent,
    ComponentTwoColumnsPreviewComponent,
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
    CardsModule,
    NgSelect2Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
