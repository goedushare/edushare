import { Input } from "@nextui-org/react";

const TextField = ({
  type,
  label,
  className,
  value,
  setValue,
  labelPlacement,
}: {
  type?: string;
  label: string;
  className?: string;
  value?: string;
  setValue?: (value: string) => void;
  labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
}) => {
  return (
    <Input
      type={type}
      label={label}
      className={className}
      variant="flat"
      labelPlacement={labelPlacement || "outside"}
      value={value}
      onValueChange={setValue}
    />
  );
};

export default TextField;
