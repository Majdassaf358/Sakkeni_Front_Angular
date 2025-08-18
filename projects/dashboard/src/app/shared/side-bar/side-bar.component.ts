import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpenSideService } from '../../Services/open-side.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  isOpen = false;

  constructor(private sidebarService: OpenSideService) {}
  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.isOpen = visible;
    });
  }
  closeSidebar() {
    this.sidebarService.close();
  }
}
