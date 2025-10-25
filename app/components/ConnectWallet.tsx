"use client";

import { client } from "@/thirdwebClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const ConnectWallet = () => {
  const account = useActiveAccount();

  useEffect(() => {
    if (account?.address) {
      mutate(account.address);
    }
  }, [account]);

  const { mutate } = useMutation({
    mutationFn: async (walletAddress: string) => {
      const res = await axios.post("/api/user/register", { walletAddress });
      return res.data;
    },
    onSuccess(data) {
      // console.log(data);
    },
  });

  return (
    <ConnectButton
      client={client}
      wallets={[createWallet("io.zerion.wallet")]}
      theme={"dark"}
    />
  );
};

export default ConnectWallet;
