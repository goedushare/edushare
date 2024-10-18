const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-scroll">
      <div className="mx-16 my-12">{children}</div>
    </div>
  );
};

export default DashboardLayout;
