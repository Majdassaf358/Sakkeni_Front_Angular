import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [NavbarComponent, FiltersComponent, CommonModule, FormsModule],
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
})
export class HomesComponent implements OnInit {
  images: string[] = [
    'assets/Imgs/landing1.jpg',
    'assets/Imgs/landing2.jpg',
    'assets/Imgs/landing3.jpg',
  ];
  currentImage = 0;
  private swapInterval!: number;
  constructor() {}
  ngOnInit(): void {
    this.swapInterval = window.setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.swapInterval);
  }
}
