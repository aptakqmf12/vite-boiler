import React from "react";
import { FlexGrid } from "@grapecity/wijmo.react.grid";
import {
  FlexChart,
  FlexChartLegend,
  FlexChartSeries,
  FlexPie,
  FlexPieDataLabel,
} from "@grapecity/wijmo.react.chart";
import { format } from "@grapecity/wijmo";
import * as wjChartAnimate from "@grapecity/wijmo.react.chart.animation";

import "@grapecity/wijmo.styles/wijmo.css";

export default function Wijmo() {
  const data = [
    { id: 1, name: "ktw", age: 31, skill: "react" },
    { id: 2, name: "ldk", skill: "vue" },
    { id: 3, name: "jjh", age: 29 },
    { id: 4, name: "kkk" },
    { id: 5, name: "jjj" },
    { id: 1, name: "ktw", age: 31, skill: "react" },
    { id: 2, name: "ldk", skill: "vue" },
    { id: 3, name: "jjh", age: 29 },
    { id: 4, name: "kkk" },
    { id: 5, name: "jjj" },
    { id: 1, name: "ktw", age: 31, skill: "react" },
    { id: 2, name: "ldk", skill: "vue" },
    { id: 3, name: "jjh", age: 29 },
    { id: 4, name: "kkk" },
    { id: 5, name: "jjj" },
    { id: 1, name: "ktw", age: 31, skill: "react" },
    { id: 2, name: "ldk", skill: "vue" },
    { id: 3, name: "jjh", age: 29 },
    { id: 4, name: "kkk" },
    { id: 5, name: "jjj" },
  ];

  const data2 = [
    {
      country: "United States",
      "2014": 17348075,
      "2015": 18036650,
      "2016": 18624450,
    },
    { country: "China", "2014": 10356508, "2015": 11181556, "2016": 11232110 },
    { country: "Japan", "2014": 4602367, "2015": 4124211, "2016": 4936540 },
    { country: "Germany", "2014": 3874437, "2015": 3365293, "2016": 3479230 },
    {
      country: "United Kingdom",
      "2014": 2950039,
      "2015": 2858482,
      "2016": 2629190,
    },
    { country: "France", "2014": 2833687, "2015": 2420163, "2016": 2466470 },
    { country: "India", "2014": 2051228, "2015": 2073002, "2016": 2263790 },
    { country: "Italy", "2014": 2147744, "2015": 1815759, "2016": 1850740 },
  ];
  const data3 = [
    { brand: "Samsung", sales: 321 },
    { brand: "Apple", sales: 215 },
    { brand: "Huawei", sales: 160 },
    { brand: "OPPO", sales: 112 },
    { brand: "Vivo", sales: 100 },
    { brand: "Others", sales: 638 },
  ];
  const palette = [
    "rgba(42,159,214,1)",
    "rgba(119,179,0,1)",
    "rgba(153,51,204,1)",
    "rgba(255,136,0,1)",
    "rgba(204,0,0,1)",
    "rgba(0,204,163,1)",
    "rgba(61,109,204,1)",
    "rgba(82,82,82,1)",
    "rgba(0,0,0,1)",
  ];

  const getLabelContent = (ht: any) => {
    return format("{name} {val:p2}", { name: ht.name, val: ht.value });
  };

  return (
    <div>
      <FlexGrid itemsSource={data} isReadOnly={true}></FlexGrid>

      <FlexChart
        header="Country GDP"
        bindingX="country"
        selectionMode="Point"
        itemsSource={data2}
        palette={palette}
      >
        <FlexChartLegend position="Bottom"></FlexChartLegend>

        <FlexChartSeries name="2014" binding="2014"></FlexChartSeries>
        <FlexChartSeries name="2015" binding="2015"></FlexChartSeries>
        <FlexChartSeries name="2016" binding="2016"></FlexChartSeries>

        <wjChartAnimate.FlexChartAnimation></wjChartAnimate.FlexChartAnimation>
      </FlexChart>

      <FlexPie
        header={"pie chart"}
        bindingName={"brand"}
        itemsSource={data3}
        palette={palette}
      >
        <FlexPieDataLabel content={getLabelContent}></FlexPieDataLabel>
      </FlexPie>
    </div>
  );
}
