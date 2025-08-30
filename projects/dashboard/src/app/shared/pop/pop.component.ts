import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pop',
  imports: [CommonModule],
  templateUrl: './pop.component.html',
  styleUrl: './pop.component.css',
})
export class PopComponent implements OnChanges {
  @Input() reportId: number | null = null;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['reportId'];
    if (change && this.reportId != null) {
      this.loadReport(this.reportId);
    }
  }

  loadReport(id: number) {
    // fetch details by id or use passed data
    console.log('Load report with id', id);
    // e.g. this.reportService.getById(id).subscribe(...)
  }

  closePop(): void {
    this.close.emit();
  }
}
