"use client";
import { authClient } from "@/utils/auth-client";
import Link from "next/link";
import { useRef, useState } from "react";
export default function Home() {
  const signedInRef = useRef(false);

  const userData = authClient.useSession().data?.user;
  if (userData?.name) signedInRef.current = true;

  if (signedInRef.current == true) {
    return (
      <div className="flex items-center justify-center text-4xl text-amber-100">
        <div>Welcome my dawg , {userData?.name} !</div>
      </div>
    );
  }

  return (
    <div className="items-center flex justify-center">
      <Link href={"/login"}>
        <div>Go to Login Page</div>
      </Link>
    </div>
  );
}
