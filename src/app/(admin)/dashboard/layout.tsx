"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Company",
    path: "/dashboard/company",
  },
  {
    name: "Experience",
    path: "/dashboard/experience",
  },
  {
    name: "Project",
    path: "/dashboard/project",
  },
  {
    name: "Skill",
    path: "/dashboard/skill",
  },
  {
    name: "Social",
    path: "/dashboard/social",
  },
  {
    name: "Tag",
    path: "/dashboard/tag",
  },
  {
    name: "User",
    path: "/dashboard/user",
  },
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="bg-site text-white bg-cover bg-no-repeat font-sora relative w-full">
      <header className="w-full ">
        <div className="container mx-auto">
          <div className="my-5">
            <h1 className="text-3xl mb-1">Dashboard</h1>
            <p>Manage your portfolio</p>
          </div>
        </div>
        <div className="border-y">
          <ul className="flex gap-3 justify-between container mx-auto">
            {routes.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li
                  className={`py-3 flex-1 text-center font-semibold uppercase ${
                    isActive ? "border-b-2 border-primary" : ""
                  }`}
                  key={item.path}
                >
                  <Link href={item.path} className="inline-block w-full">
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <main className="container mx-auto my-5">{children}</main>
    </main>
  );
}
