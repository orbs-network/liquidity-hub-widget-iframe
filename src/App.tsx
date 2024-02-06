import { Widget, WidgetArgs } from "@orbs-network/liquidity-hub-widget";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { useAccount, useConfig, useNetwork } from "wagmi";

const getConfig = () => {
  const searchParams = new URLSearchParams(document.location.search);
  return {
    chainId: searchParams.get("chainId"),
    partner: searchParams.get("partner") || "",
    slippage: searchParams.get("slippage"),
  };
};
export const useProvider = () => {
  const { data } = useConfig();

  return useMemo(() => {
    return (data as any)?.provider;
  }, [data]);
};

const config = getConfig();

export function App() {
  const { openConnectModal } = useConnectModal();
  const chainId = useNetwork().chain?.id;
  const address = useAccount()?.address;
  const provider = useProvider();
  const args = useMemo((): WidgetArgs => {
    return {
      supportedChain: config.chainId ? Number(config.chainId) : undefined,
      partner: config.partner,
      slippage: config.slippage ? Number(config.slippage) : undefined,
      onConnect: openConnectModal,
      chainId,
      address,
      provider,
    };
  }, [openConnectModal, chainId, address, provider]);

  return <Widget {...args} />;
}
