"use client";
import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { SessionProvider } from "@convex-dev/convex-lucia-auth/react";
import { AfterSSR } from "./components/helpers/AfterSSR";

const convex = new ConvexReactClient("https://tame-seahorse-621.convex.cloud");

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AfterSSR>
      <ConvexProvider client={convex}>
        <SessionProvider>{children}</SessionProvider>
      </ConvexProvider>
    </AfterSSR>
  );
}
