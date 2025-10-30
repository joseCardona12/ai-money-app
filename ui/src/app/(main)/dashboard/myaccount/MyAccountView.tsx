"use client";
import MyAccountContent from "./components/MyAccountContent";
import useMyAccount from "./hooks/useMyAccount";

export default function MyAccountView(): React.ReactNode {
  const myAccountData = useMyAccount();

  return <MyAccountContent myAccountData={myAccountData} />;
}

