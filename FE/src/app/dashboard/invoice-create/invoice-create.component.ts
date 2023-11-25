// invoice-create.component.ts
import {Component} from '@angular/core';
import {InvoiceService} from '../services/invoice.service'; // Update with the correct path
import {Router} from '@angular/router';

@Component({
    selector: 'app-invoice-create',
    templateUrl: './invoice-create.component.html',
    styleUrls: ['./invoice-create.component.css'],
})
export class InvoiceCreateComponent {
    // Define your invoice model or use a form model
    invoice: any = {
        invoiceIdentifier: '',
        customerName: '',
        contactDetails: '',
        invoiceDate: new Date(),
        dueDate: new Date(),
        amountDue: 0,
        paymentStatus: 'Pending',
    };

    constructor(private invoiceService: InvoiceService, private router: Router) {
    }

    createInvoice(): void {
        this.invoiceService.createInvoice(this.invoice).subscribe(
            (createdInvoice) => {
                console.log('Invoice created successfully:', createdInvoice);
                // Redirect to the view page or do other actions as needed
                this.router.navigate(['/invoices']);
            },
            (error) => {
                console.error('Error creating invoice:', error);
                // Handle error, show user-friendly message, etc.
            }
        );
    }
}
