import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpenSideService } from '../../Services/open-side.service';

@Component({
  standalone: true,
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  menuItems = [
    {
      label: 'Dashboard',
      route: '/statistics',
      icon: '/Icons/sidebar_dash.svg',
      activeIcon: '/Icons/sidebar_dash_active.svg',
    },
    {
      label: 'Reports',
      route: '/reports',
      icon: '/Icons/sidebar_report.svg',
      activeIcon: '/Icons/sidebar_report_active.svg',
    },
    {
      label: 'Properties',
      route: '/properties',
      icon: '/Icons/sidebar_property.svg',
      activeIcon: '/Icons/sidebar_property_active.svg',
    },
    {
      label: 'Service Providers',
      route: '/services',
      icon: '/Icons/sidebar_service.svg',
      activeIcon: '/Icons/sidebar_service_active.svg',
    },
    {
      label: 'Admins',
      route: '/admins',
      icon: '/Icons/sidebar_admins.svg',
      activeIcon: '/Icons/sidebar_admins_active.svg',
    },
    {
      label: 'Activity',
      route: '/activity',
      icon: '/Icons/sidebar_activity.svg',
      activeIcon: '/Icons/sidebar_activity_active.svg',
    },
    {
      label: 'My Properties',
      route: '/my-properties',
      icon: '/Icons/sidebar_my_properties.svg',
      activeIcon: '/Icons/sidebar_my_properties_active.svg',
    },
  ];
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
