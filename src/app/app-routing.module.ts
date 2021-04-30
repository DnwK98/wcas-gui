import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./layout/login/login.component";
import {AuthGuard} from "./service/auth/auth.guard";
import {LayoutComponent} from "./layout/layout.component";
import {DashboardComponent} from "./layout/dashboard/dashboard.component";
import {WebsiteDetailsComponent} from "./layout/website/website-details/website-details.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {PageComponent} from "./layout/website/page/page.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: "", component: DashboardComponent},
      {path: "website/:id", component: WebsiteDetailsComponent},
      {path: "website/:websiteId/page/:pageId", component: PageComponent},
      {path: "not-found", component: NotFoundComponent},
      {path: "**", component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
