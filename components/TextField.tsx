import { Input, Textarea } from "@nextui-org/react";

const TextField = ({
  type,
  label,
  placeholder,
  className,
  value,
  setValue,
  labelPlacement,
  as,
}: {
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  setValue?: (value: string) => void;
  labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
  as?: typeof Input | typeof Textarea;
}) => {
  const As = as || Input;
  return (
    <As
      type={type}
      label={label}
      placeholder={placeholder}
      className={className}
      variant="flat"
      labelPlacement={labelPlacement || "outside"}
      value={value}
      onValueChange={setValue}
    />
  );
};

export default TextField;
