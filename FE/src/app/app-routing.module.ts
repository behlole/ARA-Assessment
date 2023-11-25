import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard, doesShowLogin} from "./authentication/auth.guard";

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
