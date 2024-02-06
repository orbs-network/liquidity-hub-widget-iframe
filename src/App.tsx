import {
  Widget,
  WidgetArgs,
  WidgetUISettings,
} from "@orbs-network/liquidity-hub-widget";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import _ from "lodash";
import { useMemo } from "react";
import { getConfig } from "utils";
import { useAccount, useConfig, useNetwork } from "wagmi";
import "./reset.css";

// http:localhost:5173/?chainId=137&partner=test&styles=button-background:yellow,button-color:#B900D6,panel-background:#090333,container-background:#19013D



// console.log(
//   `styles=${encodeURIComponent(
//     JSON.stringify(thena.styles)
//   )}&layout=${encodeURIComponent(JSON.stringify(thena.layout))}`
// );


export const useProvider = () => {
  const { data } = useConfig();

  return useMemo(() => {
    return (data as any)?.provider;
  }, [data]);
};

const config = getConfig();
  console.log(config.layout);
  
const uiSettings: WidgetUISettings = {
  styles: {
    container: {
      background: config.styles?.containerBackground,
      borderRadius: config.styles?.containerBorderRadius,
      border: config.styles?.containerBorder,
      gap: config.styles?.containerGap,
    },
    switchTokens: {
      height: config.styles?.switchTokensHeight,
      button: {
        background: config.styles?.switchTokensButtonBackground,
        borderRadius: config.styles?.switchTokensButtonBorderRadius,
        borderColor: config.styles?.switchTokensButtonBorderColor,
        svg: {
          color: config.styles?.switchTokensButtonSvgColor,
        }
      }
    },
    tokenPanel: {
      container: {
        background: config.styles?.panelBackground,
        borderRadius: config.styles?.panelBorderRadius,
        border: config.styles?.panelBorder,
      },
      tokenSelector: {
        background: config.styles?.tokenPanelSelect,
      },
      header: {
        marginBottom: config.styles?.panelHeaderMarginBottom,
      }
    },
    submitButton: {
      background: config.styles?.buttonBackground,
      color: config.styles?.buttonColor,
      borderRadius: "2px",
    },
  },
  layout: {
    tokenPanel: {
      headerOutside: config.layout?.tokenPanel?.headerOutside,
    },
  },
};

export function App() {
  const { openConnectModal } = useConnectModal();
  const connectedChainId = useNetwork().chain?.id;
  const address = useAccount()?.address;
  const provider = useProvider();
  const args = useMemo((): WidgetArgs => {
    return {
      partnerChainId: config.chainId ? Number(config.chainId) : undefined,
      partner: config.partner,
      slippage: config.slippage ? Number(config.slippage) : undefined,
      onConnect: openConnectModal,
      connectedChainId,
      address,
      provider,
      uiSettings,
    };
  }, [openConnectModal, connectedChainId, address, provider]);

  if (!args.partnerChainId) {
    return <div>Chain ID is missing</div>;
  }

  if (!args.partner) {
    return <div>Partner is missing</div>;
  }

  return (
    <div className="app">
      <ConnectButton showBalance={true}  chainStatus='none' />
      <Widget {...args} />
    </div>
  );
}
