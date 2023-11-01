"use client";

import { useState } from "react";
import * as web3 from "@solana/web3.js";

export default function Home() {
  const [pubkey, setPubkey] = useState("");
  const [balance, setBalance] = useState(0);
  const [isFill, setisFill] = useState(false);

  const handleOnclick = async (address: string) => {
    try {
      const key = new web3.PublicKey(address);
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(key);
      setBalance(balance / web3.LAMPORTS_PER_SOL);
      setisFill(true);
    } catch (error) {
      setPubkey("");
      setBalance(0);
      alert("not found wallet address");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-10">
        <div className="flex flex-col gap-5 my-8">
          <input
            placeholder="place the wallet address..."
            className="w-[1000px] border-4 h-10 p-2  border-gray-800"
            onChange={(e) => {
              setPubkey(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-blue-500 p-2 rounded-md text-white text-bold mb-4"
          onClick={() => handleOnclick(pubkey)}
        >
          check balance
        </button>
        {isFill ? (
          <>
            {" "}
            <div className="flex flex-col gap-5">
              <p className="text-2xl">Address: {pubkey}</p>
              <p className="text-2xl">Balance: {balance}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
