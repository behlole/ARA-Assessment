// invoice-create.component.ts
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InvoiceService} from '../services/invoice.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css'],
})
export class InvoiceCreateComponent {
  invoiceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  initForm(): void {
    this.invoiceForm = this.fb.group({
      invoiceIdentifier: ['1234', Validators.required],
      customerName: ['', Validators.required],
      contactDetails: ['', Validators.required],
      invoiceDate: [new Date(), Validators.required],
      dueDate: [new Date(), Validators.required],
      amountDue: [100, [Validators.required, Validators.min(0)]],
      paymentStatus: ['Pending'],
    });
  }

  createInvoice(): void {
    if (this.invoiceForm.valid) {
      const invoiceData = this.invoiceForm.value;

      this.invoiceService.createInvoice(invoiceData).subscribe(
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
    } else {
      // Mark all controls as touched to trigger validation messages
      this.invoiceForm.markAllAsTouched();
      this.showErrorAlert('Please fix the validation errors before submitting.');
    }
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
