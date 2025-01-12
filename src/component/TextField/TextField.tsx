import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  placeholder: string;
  onChange?: (value: string) => void;
  value?: string;
  type?: string;
  isLabel?: boolean;
  label?: string;
  icon?: React.ReactNode;
  register?: UseFormRegisterReturn<any>;
  errors?: boolean;
  message?: string;
}

const TextField = ({
  placeholder,
  onChange,
  value,
  type,
  isLabel,
  label,
  register,
  errors,
  message,
}: TextFieldProps) => {
  return (
    <div className="w-full border border-gray-400 rounded-md p-1">
      {isLabel && <label className="text-sm font-bold">{label}</label>}
      <div className="flex flex-row items-center">
        <input
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          type={type || "text"}
          className="border-transparent w-full h-full p-2 outline-none"
          {...register}
        />
      </div>
      {errors && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default TextField;
