import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {InvoiceService} from "../dashboard/services/invoice.service";

@Component({
  selector: 'app-success-callback',
  templateUrl: './success-callback.component.html',
  styleUrls: ['./success-callback.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1})),
      ]),
    ]),
  ],
})
export class SuccessCallbackComponent {
  invoiceNumber: any;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invoiceNumber = params['invoiceNumber'];
      // Handle success callback with the invoiceNumber
      console.log('Success Callback for Invoice:', this.invoiceNumber);
      this.invoiceService.updatePaymentStatus(this.invoiceNumber).subscribe(
        () => {
          console.log('Payment status updated to "paid" successfully.');
        },
        error => {
          console.error('Error updating payment status:', error);
        }
      );
    });
  }

}
