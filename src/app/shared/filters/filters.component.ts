import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() page!: string;
  @Output() filterChange = new EventEmitter<string>();
  sideSelect: string = 'list;';
  changeDisplay(change: string) {
    this.filterChange.emit(change);
    this.sideSelect = change;
  }
}
