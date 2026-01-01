"use client";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";

export default function Login() {
  const TwitterSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "twitter",
      callbackURL: `/lobby`,
    });
  };

  const router = useRouter();

  const GithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: `/lobby`,
    });
  };

  return (
    <div className="justify-center flex flex-col items-center">
      <h1 className="text-3xl mb-10">Login to DevArena</h1>
      <button
        onClick={TwitterSignIn}
        className="rounded-lg p-4 cursor-pointer border border-neutral-300 mb-6 text-amber-50"
      >
        Login With Twitter
      </button>
      <button
        onClick={GithubSignIn}
        className="rounded-lg mb-4 p-4 cursor-pointer border border-neutral-700 text-amber-50"
      >
        Login With Github
      </button>
      <button
        className="rounded-lg mb-4 p-4 cursor-pointer border border-neutral-700 text-amber-50"
        onClick={async () => {
          await authClient.signOut();
          console.log("user logged out");
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
