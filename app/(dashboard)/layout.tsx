const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mx-16 my-12">{children}</div>;
};

export default DashboardLayout;
