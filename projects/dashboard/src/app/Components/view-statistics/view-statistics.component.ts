import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { ChartsService } from '../../Services/charts.service';
import { lastValueFrom } from 'rxjs';
import { total_users } from '../../Models/charts/total_users';
import { Properties_locations } from '../../Models/charts/properties_locations';
import { properties_status } from '../../Models/charts/properties_status';
import { services_status } from '../../Models/charts/services_status';
import { total_properties } from '../../Models/charts/total_properties';
@Component({
  selector: 'app-view-statistics',
  imports: [NavbarComponent, CommonModule, NgxEchartsModule],
  templateUrl: './view-statistics.component.html',
  styleUrl: './view-statistics.component.css',
})
export class ViewStatisticsComponent implements OnInit {
  donutOptions: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 10,
      data: ['Villa', 'House', 'Office', 'Apartment', 'House2', 'Building'],
    },
    series: [
      {
        name: 'Properties',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'outside',
        },
        labelLine: { show: true, length: 12 },
        emphasis: { disabled: false },
        data: [
          { value: 71, name: 'Villa' },
          { value: 49, name: 'House' },
          { value: 48, name: 'Office' },
          { value: 34, name: 'Apartment' },
          { value: 26, name: 'House2' },
          { value: 13, name: 'Building' },
        ],
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '241', // center number
          fontSize: 22,
          fontWeight: 700,
        },
      },
    ],
  };

  barOptions: EChartsOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['Damascus', 'Tartus', 'Lattakia', 'Daraa', 'Hama', 'Idlib'],
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 120,
      splitLine: { lineStyle: { type: 'dashed' } },
    },
    series: [
      {
        name: '2025',
        type: 'bar',
        barWidth: '40%',
        data: [56, 64, 76, 78, 70, 37],
        label: { show: true, position: 'top' },
        itemStyle: {},
        emphasis: { itemStyle: { opacity: 0.9 } },
      },
    ],
  };

  lineOptions: EChartsOption = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    yAxis: { type: 'value', min: 0 },
    series: [
      {
        name: 'Updates',
        type: 'line',
        smooth: true,
        data: [20, 60, 40, 70, 90, 65, 85, 45, 55],
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {}, // fill under line if you like
        showSymbol: false,
      },
    ],
  };
  totalUsers!: total_users;
  totalProperties!: total_properties;
  propertiesStatus!: properties_status;
  servicesStatus!: services_status;
  propertiesLocations!: Properties_locations;
  constructor(private router: Router, private srv: ChartsService) {}
  ngOnInit(): void {
    this.getStatistics();
  }

  async getStatistics() {
    try {
      let res1: ApiResponse<total_users> = await lastValueFrom(
        this.srv.getTotalUsers()
      );
      let res2: ApiResponse<total_properties> = await lastValueFrom(
        this.srv.getTotalProperties()
      );
      let res3: ApiResponse<properties_status> = await lastValueFrom(
        this.srv.getPropertyStatus()
      );
      let res4: ApiResponse<services_status> = await lastValueFrom(
        this.srv.getServiceStatus()
      );
      let res5: ApiResponse<Properties_locations> = await lastValueFrom(
        this.srv.getPropertiesLocations()
      );
      this.totalUsers = res1.data;
      this.totalProperties = res2.data;
      this.propertiesStatus = res3.data;
      this.servicesStatus = res4.data;
      this.propertiesLocations = res5.data;
    } catch (error) {
      console.log(error);
    }
  }
}
