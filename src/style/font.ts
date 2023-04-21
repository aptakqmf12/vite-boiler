import { css } from "styled-components";

import NanumGothicLight from "/fonts/NanumGothicLight.ttf";
import NanumGothicMedium from "/fonts/NanumGothic.ttf";
import NanumGothicBold from "/fonts/NanumGothicBold.ttf";
import NanumGothicExtraBold from "/fonts/NanumGothicExtraBold.ttf";

export const GlobalFonts = css`
  @font-face {
    font-family: "Nanum Gothic";
    src: url(${NanumGothicLight});
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: "Nanum Gothic";
    src: url(${NanumGothicMedium});
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Nanum Gothic";
    src: url(${NanumGothicBold});
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: "Nanum Gothic";
    src: url(${NanumGothicExtraBold});
    font-weight: 800;
    font-style: normal;
  }
`;
