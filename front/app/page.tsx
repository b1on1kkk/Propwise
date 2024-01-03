"use client";

import { useRouter } from "next/navigation";

import Loading from "@/components/Loading/Loading";

export default function Home() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/home");
  }, 2000);

  return <Loading />;
}
