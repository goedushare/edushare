import { Input } from "@nextui-org/react";

const TextField = ({
  type,
  label,
  className,
}: {
  type: string;
  label: string;
  className?: string;
}) => {
  return (
    <Input
      type={type}
      label={label}
      className={className}
      variant="flat"
      labelPlacement={"outside"}
    />
  );
};

export default TextField;
