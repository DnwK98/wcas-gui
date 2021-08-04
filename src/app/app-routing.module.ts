import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './layout/login/login.component';
import {AuthGuard} from './service/auth/auth.guard';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {WebsiteDetailsComponent} from './layout/website/website-details/website-details.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {PageComponent} from './layout/website/page/page.component';
import {RegisterComponent} from './layout/register/register.component';
import {WebsiteNewComponent} from "./layout/website/website-new/website-new.component";
import {DomainNewComponent} from "./layout/domain/domain-new/domain-new.component";
import {DomainVerificationComponent} from "./layout/domain/domain-verification/domain-verification.component";
import {UserComponent} from "./layout/user/user.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'website/new', component: WebsiteNewComponent},
      {path: 'website/:id', component: WebsiteDetailsComponent},
      {path: 'website/:websiteId/page/:pageId', component: PageComponent},
      {path: 'domain/new', component: DomainNewComponent},
      {path: 'domain/:id/verification', component: DomainVerificationComponent},
      {path: 'user/settings', component: UserComponent},
      {path: 'not-found', component: NotFoundComponent},
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
