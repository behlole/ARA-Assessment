// dashboard-routing.module.ts
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';
import {InvoiceViewComponent} from './invoice-view/invoice-view.component';
import {PaymentLinkComponent} from './payment-link/payment-link.component';
import {SidebarComponent} from "./sidebar/sidebar.component";

const routes: Routes = [
    {
        path: '', component: SidebarComponent, children: [
            {path: '', redirectTo: 'view-invoices', pathMatch: 'full'},
            {path: 'create-invoice', component: InvoiceCreateComponent},
            {path: 'view-invoices', component: InvoiceViewComponent},
            {path: 'generate-payment-link', component: PaymentLinkComponent},
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {
}
