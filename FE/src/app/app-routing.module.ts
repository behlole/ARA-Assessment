import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard, doesShowLogin} from "./authentication/auth.guard";
import {SuccessCallbackComponent} from "./success-callback/success-callback.component";
import {CancelCallbackComponent} from "./cancel-callback/cancel-callback.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: "prefix",
  },
  {
    path: 'auth',
    canActivate: [doesShowLogin],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {path: 'success/:invoiceNumber', component: SuccessCallbackComponent},
  {path: 'cancel/:invoiceNumber', component: CancelCallbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
