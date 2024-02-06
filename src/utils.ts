import _ from "lodash";

// const config: StyleParams = {
//   "button-background": "#CE00BF",
//   "panel-background": "#090333",
// };

export const getConfig = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const stylesParam = searchParams.get("styles");
  const layoutParam = searchParams.get("layout");
    
  return {
    chainId: searchParams.get("chainId"),
    partner: searchParams.get("partner") || "",
    slippage: searchParams.get("slippage"),
    styles: parse(stylesParam),
    layout: parse(layoutParam),
  };
};

const parse = (styles?: string | null) => {
  if (!styles) {
    return undefined;
  }
  
  try {
      const parsed = JSON.parse(styles);
    return parsed;
  } catch (error) {}
};
