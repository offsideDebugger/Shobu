import Link from "next/link";
export default function Navbar() {
  const links = [
    { label: "Time Rush", path: "/time-rush" },
    { label: "Room", path: "/room" },
    { label: "Clash", path: "/clash" },
    { label: "Rules", path: "/rules" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className="flex justify-between w-full p-2">
      <div className="text-2xl text-neutral-100 text-shadow-sm">Shobu</div>
      <div className="flex justify-around w-lg mt-2">
        {links.map((link) => (
          <div
            key={link.label}
            className="text-md text-neutral-300 hover:text-neutral-500 transition duration-100 text-shadow-sm"
          >
            {link.label}
          </div>
        ))}
      </div>
      <div>
        <Link href={"/login"}><button className="text-black bg-amber-50 p-2 rounded-lg shadow-md shadow-amber-700 transition duration-100 hover:text-amber-700 hover:translate-y-0.5 ">
          Get Started
        </button></Link>
      </div>
    </div>
  );
}
