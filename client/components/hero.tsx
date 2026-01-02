import heroImg from "@/bg.png";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <div className="flex relative font-family mt-20 flex-row h-210">
        <Image
          alt="hero"
          src={heroImg}
          className="w-screen absolute inset-0 object-cover rounded-lg h-full"
        ></Image>
        <div className="absolute inset-0 bg-linear-to-b from-neutral-900 via-transparent to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 25%, #171717 75%)",
          }}
        ></div>
        <div className="absolute inset-0 z-10 flex mt-20 justify-center">
          <div className="flex flex-col items-center text-center tracking-tight space-y-2  text-shadow-sm ">
            <div className="max-w-sm rounded-full flex items-center justify-center p-4  h-6 border border-neutral-700 backdrop-blur-3xl mb-2">
              <span className="text-[10px] text-amber-100">
                Trusted by 69+ Developers across the globe{" "}
              </span>
            </div>
            <h1 className="text-7xl font-bold text-amber-100 text-shadow-amber-100">
              Sho
              <span className="text-amber-700 text-shadow-amber-700">
                bu
              </span>
            </h1>
            <p className="text-2xl text-amber-100">Code. Clash. Conquer.</p>
            <p className="text-lg mt-2 max-w-xl text-amber-100">
              Challenge developers across the globe in live coding battles.
              Write, execute, and climb the leaderboard in real time.
            </p>
            <Link href={"/lobby"}><button className="text-black bg-amber-50 py-2 px-6 mt-4 rounded-lg shadow-md shadow-amber-700 transition duration-100 hover:text-amber-700 hover:translate-y-0.5 ">
              Clash Now !
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
