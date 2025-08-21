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
  donutOptions: EChartsOption | null = null;
  groupOptions: EChartsOption | null = null; // residential vs commercial (nested)
  topLevelOptions: EChartsOption | null = null;
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
  totalUsers: total_users | null = null;
  totalProperties: total_properties | null = null;
  propertiesStatus: properties_status | null = null;
  servicesStatus: services_status | null = null;
  propertiesLocations: Properties_locations | null = null;
  activeView: 'groups' | 'top' = 'groups';
  private chartInstance: any;
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
      this.buildOptions();
      this.donutOptions = this.groupOptions;
    } catch (error) {
      console.log(error);
      this.totalProperties = null as any;
      this.buildOptions();
      this.donutOptions = this.groupOptions;
    }
  }
  onChartInit(ec: any) {
    this.chartInstance = ec;
  }
  private buildOptions() {
    const p =
      this.totalProperties ??
      ({
        total: 0,
        residential: { total: 0, villa: 0, apartment: 0 },
        commercial: { total: 0, office: 0 },
        'off-plan': 0,
        purchase: 0,
        rent: 0,
      } as any);
    const inner = [
      { value: p.residential?.total ?? 0, name: 'Residential' },
      { value: p.commercial?.total ?? 0, name: 'Commercial' },
    ];
    const outer = [
      { value: p.residential?.villa ?? 0, name: 'Villa' },
      { value: p.residential?.apartment ?? 0, name: 'Apartment' },
      { value: p.commercial?.office ?? 0, name: 'Office' },
    ];
    this.groupOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.seriesName ? params.seriesName + '<br/>' : ''}<b>${
            params.name
          }</b>: ${params.value} (${params.percent}%)`;
        },
      },
      legend: { bottom: 10 },
      series: [
        {
          name: 'Groups',
          type: 'pie',
          selectedMode: 'single',
          radius: ['30%', '45%'],
          label: { position: 'inside', formatter: '{b}\n{c}' },
          data: inner,
        },
        {
          name: 'Details',
          type: 'pie',
          radius: ['60%', '75%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: true, length: 12 },
          data: outer,
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: String(
              p.total ?? inner.reduce((s: any, a: any) => s + a.value, 0)
            ),
            fontSize: 20,
            fontWeight: 700,
          },
        },
      ],
    };
    const topData = [
      { value: p['off-plan'] ?? 0, name: 'Off-plan' },
      { value: p.purchase ?? 0, name: 'Purchase' },
      { value: p.rent ?? 0, name: 'Rent' },
    ];

    this.topLevelOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) =>
          `${params.marker} <b>${params.name}</b><br/>Count: ${params.value}<br/>Share: ${params.percent}%`,
      },
      legend: { bottom: 10 },
      series: [
        {
          name: 'Top-level',
          type: 'pie',
          radius: ['45%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{c} ({d}%)',
          },
          labelLine: { length: 12 },
          data: topData,
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: String(
              p.total ?? topData.reduce((s: any, a: any) => s + a.value, 0)
            ),
            fontSize: 20,
            fontWeight: 700,
          },
        },
      ],
    };
  }

  switchView(view: 'groups' | 'top') {
    if (this.activeView === view) return;
    this.activeView = view;
    this.donutOptions =
      view === 'groups' ? this.groupOptions : this.topLevelOptions;

    if (this.chartInstance && this.donutOptions) {
      // replace previous config cleanly
      this.chartInstance.setOption(this.donutOptions, { notMerge: true });
    }
  }
}
