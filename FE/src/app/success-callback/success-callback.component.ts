import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-success-callback',
  templateUrl: './success-callback.component.html',
  styleUrls: ['./success-callback.component.css']
})
export class SuccessCallbackComponent {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const invoiceNumber = params['invoiceNumber'];
      // Handle success callback with the invoiceNumber
      console.log('Success Callback for Invoice:', invoiceNumber);
    });
  }
}
