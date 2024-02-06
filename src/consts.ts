import { StyleParams } from "types";

export const thenaStyles: StyleParams = {
  buttonBackground: "#D000BF",
  buttonColor: "white",
  panelBackground: "#090333",
  panelBorder: "1px solid #D000BF",
  panelBorderRadius: "2px",
  containerBackground: "#1A023C",
  containerBorder: "1px solid #D000BF",
  containerBorderRadius: "2px",
  containerGap: "10px",
  tokenPanelSelect: "transparent",
  panelHeaderMarginBottom: "10px",
  switchTokensButtonBackground: "#260F47",
  switchTokensButtonBorderRadius: "2px",
  switchTokensButtonBorderColor: "transparent",
  switchTokensButtonSvgColor: "white",
  switchTokensHeight: "unset",
};

const thenaLayout = {
  tokenPanel: {
    headerOutside: true,
  },
};


export const thena = {
    styles: thenaStyles,
    layout: thenaLayout,
}
