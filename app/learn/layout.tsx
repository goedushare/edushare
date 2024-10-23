"use client";

import withAuth from "@/lib/withAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default withAuth(Layout);
