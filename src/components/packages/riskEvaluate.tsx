import React from "react";
import Template, { TabStatus, TemplateProps } from "../layout/template";

const TAB1: TemplateProps[] = [
  {
    name: "대시보드",
    status: TabStatus.ONE,
    component: <div>대시보드</div>,
  },
  {
    name: "위험성평가(수시)",
    status: TabStatus.TWO,
    component: <div>위험성평가(수시)</div>,
  },
  {
    name: "위험성평가(최초)",
    status: TabStatus.THREE,
    component: <div>위험성평가(최초)</div>,
  },
  {
    name: "위험성평가 점검",
    status: TabStatus.FOUR,
    component: <div>위험성평가 점검</div>,
  },
];

export default function RiskEvaluate() {
  return <Template data={TAB1} />;
}
