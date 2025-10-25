"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";
import zerionInstance from "../zerionInstance";

export const useUser = () => {
  const account = useActiveAccount();

  const queryRes = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        `/api/user?walletAddress=${account?.address}`
      );
      return res.data.user;
    },
    enabled: !!account?.address,
  });

  return { ...queryRes, userId: queryRes.data?._id };
};

export const useGetUserPNL = () => {
  const account = useActiveAccount();

  const queryRes = useQuery({
    queryKey: ["userPNL", account?.address],
    queryFn: async () => {
      const res = await zerionInstance.get(
        `/wallets/${account?.address}/pnl?currency=usd`
      );

      const { realized_gain, unrealized_gain, net_invested } =
        res.data.data.attributes;

      if (!net_invested || net_invested === 0) return 0;

      const totalPnL = realized_gain + unrealized_gain;
      const pnlPercentage = (totalPnL / net_invested) * 100;

      return pnlPercentage;
    },
    enabled: !!account?.address,
  });

  return queryRes;
};
