import React, { useState } from "react";

type AutocompleteProps = {
  options: string[];
  placeholder: string;
  errors?: boolean;
  message?: string;
  register?: UseFormRegisterReturn<any>;
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  placeholder,
  errors,
  message,
  register,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setDropdownVisible(false);
  };

  return (
    <div className="w-full border border-gray-400 rounded-md p-1">
      <input
        {...register}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(!!filteredOptions.length)}
        className="border-transparent w-full h-full p-2 outline-none"
        placeholder={placeholder}
      />
      {isDropdownVisible && (
        <ul className="absolute max-w-full border rounded bg-white shadow-md max-h-40 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-500">Sin resultados</li>
          )}
        </ul>
      )}
      {errors && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default Autocomplete;
