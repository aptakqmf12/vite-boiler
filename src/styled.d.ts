import styled from "styled-components";
import { ColorsType } from "./style/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;

    colors: ColorsType;
  }
}
