"use client";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
export default function Lobby() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [response, setResponse] = useState();
  const IdRef = useRef("");

  useEffect(() => {
    if (!isPending && !session?.user?.name) {
      router.push("/login");
    }
  }, [isPending, session?.user?.name, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl text-amber-100">
        Loading...
      </div>
    );
  }

  if (!session?.user?.name) {
    return null;
  }

  async function findMatch() {
    const matchSearch = await axios.get(`http://localhost:3000/api/findmatch`, {
      params: {
        userId: session?.user.id,
      },
    });

    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connected to socket");
    });
    socket.on("disconnect", () => {
      console.log("disconnected from socket");
    });
    socket.on("message", (message) => {
      console.log(message);
    });

    const response = await matchSearch.data;
    const mesagge = response.message;
    setResponse(mesagge);
    IdRef.current = response.userId;
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div className="text-4xl text-amber-100">
        Welcome my dawg, {session.user.name}!
      </div>
      <div className="mt-6">
        <button
          className="rounded-lg bg-amber-50 text-black text-xl p-2 border border-s-stone-800 cursor-pointer"
          onClick={findMatch}
        >
          Find Match
        </button>
      </div>
      <div className="mt-6 text-2xl text-amber-700">{response}</div>
      <div className="mt-6 text-2xl text-amber-700">{IdRef.current}</div>
    </div>
  );
}
