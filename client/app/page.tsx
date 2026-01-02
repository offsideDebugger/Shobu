
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className=" bg-neutral-900 h-screen p-2 font-family">
      <Navbar />
      <Hero />
    </div>
  );
}
