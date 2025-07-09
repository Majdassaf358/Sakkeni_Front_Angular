import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-services',
  imports: [NavbarComponent, FiltersComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.scrollContainer.nativeElement.classList.add('dragging');
    this.startX = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
  }

  stopDrag(): void {
    this.isDragging = false;
    this.scrollContainer.nativeElement.classList.remove('dragging');
  }

  onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
