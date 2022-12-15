"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function Login() {
  const imageCount = 8;
  return (
    <div className="h-screen w-full relative flex items-center justify-center bg-base-300">
      <Image
        alt="background"
        src={`/bgs/${Math.ceil(Math.random() * imageCount)}.jpg`}
        fill={true}
        style={{ objectFit: "cover" }}
      />

      <div className="relative bg-base-100 shadow-2xl pt-4 pb-10 px-10 rounded-lg flex flex-col items-center max-w-[400px] w-full ">
        <Link href={process.env.NEXT_PUBLIC_DOCS_URL || ""}>
          <Image src="/logo.png" alt="logo" width={200} height={60} />
        </Link>
        <div className="h-full flex flex-col space-y-6 items-center">
          <p className="text-xl font-bold">Welcome back!</p>
          <button
            onClick={() => signIn("google")}
            className="shadow-lg flex space-x-2 items-center  p-2 rounded-lg bg-base-200 w-[300px]"
          >
            <Image src="/icons/google.webp" alt="google" width={30} height={30} />
            <p className="w-full text-center font-medium">Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}