// invoice-create.component.ts
import {Component} from '@angular/core';
import {InvoiceService} from '../services/invoice.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css'],
})
export class InvoiceCreateComponent {
  invoice: any = {
    invoiceIdentifier: '1234',
    customerName: 'customer',
    contactDetails: 'details',
    invoiceDate: new Date(),
    dueDate: new Date(),
    amountDue: 100,
    paymentStatus: 'Pending',
  };

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  createInvoice(): void {
    this.invoiceService.createInvoice(this.invoice).subscribe(
      (createdInvoice) => {
        console.log('Invoice created successfully:', createdInvoice);
        this.showSuccessAlert('Invoice created successfully');
        this.router.navigate(['dashboard/view-invoices']);
      },
      (error) => {
        console.error('Error creating invoice:', error);
        this.showErrorAlert(error.error.error);
      }
    );
  }

  private showSuccessAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
