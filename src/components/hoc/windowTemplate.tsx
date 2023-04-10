import React from "react";
import WindowCustom from "../layout/windowCustom";
import Template from "../layout/template";
import { TemplateProps } from "../layout/template";

export default function WindowTemplate({ data }: { data: TemplateProps[] }) {
  return (
    <WindowCustom>
      <Template data={data}></Template>
    </WindowCustom>
  );
}
