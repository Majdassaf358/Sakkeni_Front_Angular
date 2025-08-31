import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { propertyCard } from '../../Models/property-card';
import { PropertyService } from '../../Services/property.service';
import { PaginatedData } from '../../Models/paginatedData';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  StripePaymentElementComponent,
  StripeElementsDirective,
} from 'ngx-stripe';

import {
  Stripe,
  StripeElementsOptions,
  StripePaymentElementOptions,
  loadStripe,
} from '@stripe/stripe-js';
type StatusFilter = 'All' | 'Pending' | 'Sold';
@Component({
  selector: 'app-profile-history',
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
  ],
  templateUrl: './profile-history.component.html',
  styleUrl: './profile-history.component.css',
})
export class ProfileHistoryComponent implements OnInit {
  @ViewChild(StripeElementsDirective, { static: false })
  elementsDirective!: StripeElementsDirective;
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  stripeRaw: Stripe | null = null;

  // single Stripe instance used by template & confirm
  stripeForTemplate: any = null;
  tabs: StatusFilter[] = ['All', 'Pending', 'Sold'];
  activeFilter: StatusFilter = 'All';
  profileHistory: propertyCard[] = [];
  type: string = 'rent';
  page: number = 1;
  currentPage: number = 1;
  pagination: any;
  test: boolean = false;
  imageUrl: string = 'http://192.168.20.74:8000/';

  constructor(
    private srv: PropertyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    loadStripe(
      'pk_test_51S2C9JFGp8MM24lt1C5YfvI6Lud172VBjygqMBDt8znVyw8b1eIm0nPQiKIoB5IAnPAX4Vqb31vCR7VmqqeIZHCL00SvBiM1Z0'
    )
      .then((s) => {
        this.stripeRaw = s;
        this.stripeForTemplate = s;
        console.log('stripe loaded', !!s);
      })
      .catch((err) => console.error('loadStripe error', err));
  }
  elementsOptions: StripeElementsOptions = {
    clientSecret: '',
    locale: 'en',
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: { type: 'tabs' },
  };
  ngOnInit(): void {
    this.myProperties(1);
  }
  async myProperties(page: number) {
    try {
      let res = await lastValueFrom(this.srv.viewMyProperties(this.type, page));
      this.profileHistory = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  changeType(change: string) {
    this.type = change;
    this.myProperties(1);
  }
  setFilter(filter: StatusFilter, page: number) {
    this.activeFilter = filter;
    this.myProperties(page);
  }

  goTo(id: number) {
    this.router.navigate(['/property', id]);
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.setFilter(this.activeFilter, page);
    }
  }

  nextPage() {
    if (this.pagination?.next_page_url) {
      this.setFilter(this.activeFilter, this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.prev_page_url) {
      this.setFilter(this.activeFilter, this.currentPage - 1);
    }
  }

  getPageRange(): number[] {
    const total = this.pagination?.last_page || 1;
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  getImageSrc(path?: string): string {
    if (!path) {
      return 'assets/Imgs/pool.jpg';
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return this.imageUrl + path;
  }

  async payment(id: number) {
    try {
      const res = await lastValueFrom(this.srv.pay(id));
      const clientSecret = res.data.clientSecret;
      const newOptions: StripeElementsOptions = {
        clientSecret,
        locale: this.elementsOptions.locale,
      };
      this.elementsOptions = newOptions;
    } catch (err) {
      console.error(err);
    }
  }

  async confirmPayment() {
    if (!this.stripeRaw) {
      console.error('Stripe.js not loaded yet');
      return;
    }

    const clientSecret = this.elementsOptions.clientSecret;
    if (!clientSecret) {
      console.error('No client secret set');
      return;
    }

    const elements = this.stripeRaw.elements({
      clientSecret,
      locale: this.elementsOptions.locale,
    });

    const result = await this.stripeRaw.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/payment-success',
      },
    });

    if ((result as any).error) {
      console.error('Payment error', (result as any).error);
    } else {
      console.log('Payment success', result);
    }
  }
}
