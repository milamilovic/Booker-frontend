import { Component } from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {Circle, Root, Template} from "@amcharts/amcharts5";
@Component({
  selector: 'app-date-interval-report',
  templateUrl: './date-interval-report.component.html',
  styleUrls: ['./date-interval-report.component.css']
})
export class DateIntervalReportComponent {
  // @ts-ignore
  root: Root;

  // @ts-ignore
  chart;

  ngAfterViewInit(): void {
    this.root = am5.Root.new('chartdiv2');
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);
    this.chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft:0,
      paddingRight:1
    }));
    let cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {}));
    cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(this.root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
      maxDeviation: 0.3,
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(this.root, {
      strokeOpacity: 0.1
    })

    let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    let series = this.chart.series.push(am5xy.ColumnSeries.new(this.root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "country",
      tooltip: am5.Tooltip.new(this.root, {
        labelText: "{valueY}"
      })
    }));


    let circleTemplate = am5.Template.new({}) as Template<Circle>;

    series.bullets.push(function (root: am5.Root, series: any, dataItem: any) {
      let bulletContainer = am5.Container.new(root, {});
      let circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 34
          },
          circleTemplate
        )
      );

      let maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 27 })
      );

      // only containers can be masked, so we add image to another container
      let imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle
        })
      );

      let image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60
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
        min: am5.color(0x90A288),
        max: am5.color(0x90A288),
        target: series.columns.template,
        key: "fill"
      },
      {
        dataField: "valueY",
        min: am5.color(0x90A288),
        max: am5.color(0x90A288),
        target: circleTemplate,
        key: "fill"
      }
    ]);


// Set data
    let data = [{
      country: "January",
      value: 1040
    }, {
      country: "February",
      value: 1882
    }, {
      country: "March",
      value: 1809
    }, {
      country: "April",
      value: 880
    }, {
      country: "May",
      value: 512
    }, {
      country: "June",
      value: 1114
    }, {
      country: "July",
      value: 367
    }, {
      country: "August",
      value: 711
    }, {
      country: "September",
      value: 1912
    }, {
      country: "October",
      value: 443
    }, {
      country: "November",
      value: 441
    }, {
      country: "December",
      value: 1500
    }];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    this.chart.appear(1000, 100);
  }
}
