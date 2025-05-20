import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
const errorData = {
  404: {
    code: "404",
    message: "Page Not Found",
    desc: "Sorry, the page you are looking for does not exist, has been moved, or is temporarily unavailable.",
    btn: (
      <Link href="/" className="mt-4 py-2 text-white hover:underline">
        Go Back Home
      </Link>
    ),
  },
  500: {
    code: "500",
    message: "Internal Server Error",
    desc: "Sorry, something went wrong on the server. We’re working to fix it. Please try again later or contact support if the problem persists.",
    btn: <Button onClick={() => window.location.reload()}>Refresh</Button>,
  },
};

export default function ErrorView({ code }: { code: 404 | 500 }) {
  return (
    <div className="page bg-site min-h-screen flex items-center justify-center  p-4 bg-cover bg-no-repeat w-full">
      <div className=" rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full max-w-5xl">
        <div className="p-8 flex flex-col justify-center space-y-4 items-start">
          <h1 className="text-6xl font-bold text-accent">
            {errorData[code].code}
          </h1>
          <p className="text-2xl font-semibold text-gray-500">
            {errorData[code].message}
          </p>
          <p>{errorData[code].desc}</p>
          {errorData[code].btn}
        </div>
        <div className=" flex items-center justify-center p-6">
          <img
            src="./space.png"
            alt="Error Illustration"
            className="max-h-120 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
