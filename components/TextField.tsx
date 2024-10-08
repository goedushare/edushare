import { Input } from "@nextui-org/react";

const TextField = ({
  type,
  label,
  className,
  value,
  setValue,
}: {
  type?: string;
  label: string;
  className?: string;
  value?: string;
  setValue?: (value: string) => void;
}) => {
  return (
    <Input
      type={type}
      label={label}
      className={className}
      variant="flat"
      labelPlacement={"outside"}
      value={value}
      onValueChange={setValue}
    />
  );
};

export default TextField;
