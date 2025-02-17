import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  ref: React.Ref<HTMLInputElement>;
  placeholder: string;
  value?: string;
  type?: string;
  isLabel?: boolean;
  label?: string;
  icon?: React.ReactNode;
  register?: UseFormRegisterReturn;
  errors?: boolean;
  message?: string;
}

const TextField = ({
  name,
  onChange,
  onBlur,
  ref,
  placeholder,
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
          onBlur={onBlur}
          ref={ref}
          name={name}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          value={value || ""}
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
