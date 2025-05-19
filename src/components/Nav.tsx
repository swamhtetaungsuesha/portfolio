"use client";

export const navData = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "careers", path: "/carrers" },
  { name: "projects", path: "/projects" },
  {
    name: "skills",
    path: "/skills",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Update the active index based on the current route
    const currentIndex = navData.findIndex((link) => link.path === pathname);
    setActiveIndex(currentIndex);
  }, [pathname]);

  return (
    <nav className="bg-black/10 h-screen flex flex-col">
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">
          SH <span className="text-accent">.</span>
        </h1>
      </div>
      <div className="flex flex-col flex-1 justify-between relative">
        {navData.map((link) => {
          return (
            <Link
              href={link.path}
              key={link.path}
              className="uppercase flex-1 flex justify-center items-center h-full hover:text-gray-600"
            >
              <div
                className={`-rotate-90 origin-center whitespace-nowrap text-[10px] tracking-widest h-max transition-colors duration-200 ${
                  pathname === link.path && "text-accent"
                }`}
              >
                {link.name}
              </div>
            </Link>
          );
        })}
        <div
          className="absolute bg-accent w-[1px] transition-all duration-300"
          style={{
            height: `${100 / navData.length}%`,
            top: `${(100 / navData.length) * activeIndex}%`,
            right: 0,
          }}
        ></div>
      </div>
    </nav>
  );
};

export default Nav;
