import { Component, OnInit, AfterViewInit } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {Circle, Root, Template} from "@amcharts/amcharts5";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReportsService} from "../reports.service";
import {AccommodationName} from "../model/AccommodationName";
import {AccommodationListingDto} from "../../accommodation/accommodation/model/accommodation-listing.model";
import {ReportDataUnit} from "../model/ReportDataUnit";

@Component({
  selector: 'app-accommodation-report',
  templateUrl: './accommodation-report.component.html',
  styleUrls: ['./accommodation-report.component.css']
})
export class AccommodationReportComponent implements OnInit{
  // @ts-ignore
  root: Root;

  // @ts-ignore
  chart;

  selectedAccommodation: AccommodationName = {"title": "", id: 0}; // property to store the selected option
  accommodations: AccommodationName[] = [];
  year: number = new Date().getFullYear();

  constructor(private service: ReportsService) {
  }

  public ngOnInit() {
    this.root = am5.Root.new('chartdiv');
    let loggedId: number = Number(localStorage.getItem("loggedId"));
    this.service.getAccommodationNames(loggedId).subscribe( {
      next: (data: AccommodationName[]) => {
        this.accommodations = data;
        // @ts-ignore
        this.selectedAccommodation = this.accommodations.at(0).title;
        console.log("Ucitan smestaj: " + this.selectedAccommodation)
        this.generateReport()
      },
      error: (_) => {
        console.log("Greska!")
      }
    })
  }

  //TODO: add form validations for year picker

  generateReport(): void {
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);
    this.chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: false,
      panY: false,
      paddingLeft: 0,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: this.root.verticalLayout
    }));

    let legend = this.chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.p50,
        x: am5.p50,
        fillField: "color",
        lineFill: "color"
      })
    );

    let data : ReportDataUnit[] = []
    let loggedId = Number(localStorage.getItem("loggedId"));
    let accId = 0;
    console.log(this.selectedAccommodation)
    // @ts-ignore
    this.service.getAccommodationId(this.selectedAccommodation).subscribe({
      next: (id: number) => {
        accId = id;
        console.log("Dobavljen id "+accId+" za smestaj sa imenom " + this.selectedAccommodation + ", sada se dobavlja izvestaj: ")
        this.service.getAccommodationReport(this.year, loggedId, accId).subscribe({
          next: (serviceData: ReportDataUnit[]) => {
            data = serviceData;
            let xRenderer = am5xy.AxisRendererX.new(this.root, {
              cellStartLocation: 0.1,
              cellEndLocation: 0.3,
              minorGridEnabled: true
            })

            let xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
              categoryField: "name",
              renderer: xRenderer,
              tooltip: am5.Tooltip.new(this.root, {})
            }));

            xRenderer.grid.template.setAll({
              location: 1
            })

            xAxis.data.setAll(data);

            let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
              renderer: am5xy.AxisRendererY.new(this.root, {
                strokeOpacity: 0.1
              })
            }));

            let that = this;

            function makeSeries(name: string, fieldName: string, color: string) {
              let series = that.chart.series.push(am5xy.ColumnSeries.new(that.root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "name"
              }));

              if(fieldName!=="reservations") {
                series.columns.template.setAll({
                  tooltipText: fieldName+" : {valueY}",
                  width: am5.percent(90),
                  tooltipY: 0,
                  strokeOpacity: 0
                });
              } else {
                series.columns.template.setAll({
                  tooltipText: fieldName+" : {valueY} / 100",
                  width: am5.percent(90),
                  tooltipY: 0,
                  strokeOpacity: 0
                });
              }

              series.data.setAll(data);

              // Make stuff animate on load
              // https://www.amcharts.com/docs/v5/concepts/animations/
              series.appear();

              series.bullets.push(function () {
                return am5.Bullet.new(that.root, {
                  locationY: 0,
                  sprite: am5.Label.new(that.root, {
                    text: "{valueY}",
                    fill: am5.color(color),
                    centerY: 0,
                    centerX: am5.p50,
                    populateText: true
                  })
                });
              });

              series.bullets.push(function (root: am5.Root, series: any, dataItem: any) {
                let bulletContainer = am5.Container.new(root, {});

                let maskCircle = bulletContainer.children.push(
                  am5.Circle.new(root, { radius: 27 })
                );

                // only containers can be masked, so we add image to another container
                let imageContainer = bulletContainer.children.push(
                  am5.Container.new(root, {
                    mask: maskCircle
                  })
                );

                return am5.Bullet.new(root, {
                  locationY: 0,
                  sprite: bulletContainer
                });
              });


              series.set("heatRules", [
                {
                  dataField: "valueY",
                  min: am5.color(color),
                  max: am5.color(color),
                  target: series.columns.template,
                  key: "fill"
                }
              ]);

              series.set("fill", am5.color(color));
              legend.data.push(series);
            }

            makeSeries("Profit", "profit", "#81917a");
            makeSeries("Reservations", "reservations", "#566151");

            this.chart.appear(1000, 100);
          },
          error: (_) => {
            console.log("Greska!")
          }
        });
      },
      error: (_) => {
        console.log("Greska!")
      }
    });

  }

  loadData() {
    var newData : ReportDataUnit[] = []
    let loggedId = Number(localStorage.getItem("loggedId"));
    let accId = 0;
    console.log(this.selectedAccommodation)
    // @ts-ignore
    this.service.getAccommodationId(this.selectedAccommodation).subscribe({
      next: (id: number) => {
        accId = id;
        console.log("Dobavljen id "+accId+" za smestaj sa imenom " + this.selectedAccommodation + ", sada se dobavlja izvestaj: ")
        this.service.getAccommodationReport(this.year, loggedId, accId).subscribe({
          next: (serviceData: ReportDataUnit[]) => {
            if (this.chart) {
              this.chart.dispose();
              this.generateReport();
            }
          },
          error: (_) => {
            console.log("Greska!")
          }
        });
      },
      error: (_) => {
        console.log("Greska!")
      }
    });
    return newData;
  }

  reloadData() {
    this.loadData();
  }
}
