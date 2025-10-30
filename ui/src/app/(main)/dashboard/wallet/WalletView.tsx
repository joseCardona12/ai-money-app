"use client";
import WalletContent from "./components/WalletContent";
import useWallet from "./hooks/useWallet";

export default function WalletView(): React.ReactNode {
  const walletData = useWallet();

  return <WalletContent walletData={walletData} />;
}
