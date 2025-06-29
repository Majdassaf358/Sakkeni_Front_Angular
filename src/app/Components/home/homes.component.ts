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
  slides = [
    {
      image: 'assets/Imgs/landing1.jpg',
      title: 'One Platform,<br />Infinite Property Possibilities',
      text: 'Buy, sell or rent, your next move,<br /> starts here!',
      position: 'center 78%',
    },
    {
      image: 'assets/Imgs/landing2.jpg',
      title: 'Everything You Need<br /> Under One Roof',
      text: 'From construction to careers, bring your vision or<br /> find your next role.',
      position: 'center 13%',
    },
    {
      image: 'assets/Imgs/landing3.jpg',
      title: 'From Start To Keys<br /> in Your Hand!',
      text: 'Because finding a home<br /> should be this easy.',
      position: 'center 51%',
    },
  ];
  currentImage = 0;
  private swapInterval!: number;
  constructor() {}
  ngOnInit(): void {
    this.swapInterval = window.setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.slides.length;
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.swapInterval);
  }
}
