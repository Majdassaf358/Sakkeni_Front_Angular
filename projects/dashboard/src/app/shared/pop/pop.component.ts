import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { property_report } from '../../Models/Reports/property_report';
import { service_report } from '../../Models/Reports/service_report';

@Component({
  selector: 'app-pop',
  imports: [CommonModule],
  templateUrl: './pop.component.html',
  styleUrl: './pop.component.css',
})
export class PopComponent implements OnChanges {
  @Input() reportService: service_report = new service_report();
  @Input() reportProperty: property_report = new property_report();
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportProperty'] && this.reportProperty) {
      this.handlePropertyReportChange(this.reportProperty);
    }

    if (changes['reportService'] && this.reportService) {
      this.handleServiceReportChange(this.reportService);
    }
  }

  private handlePropertyReportChange(r: property_report): void {
    console.log('Property report received in popup:', r);
  }

  private handleServiceReportChange(r: service_report): void {
    console.log('Service report received in popup:', r);
  }

  closePop(): void {
    this.close.emit();
  }
}
