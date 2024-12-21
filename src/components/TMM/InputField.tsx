import React from 'react';
import { useDispatch } from 'react-redux';

// interface Option {
//   value: string;
//   label: string;
// }

interface InputSelectProps {
  options: string[] | number[];
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  label?:string;
  onClick?: (event: React.MouseEvent<HTMLSelectElement>) => void;
}

const InputField: React.FC<InputSelectProps> = ({
  options,
  placeholder = "All",
  onChange,
  label,
  onClick
  
}) => {
  const dispatch = useDispatch();
 
  return (
    <div className='' >
    <select
      className="border border-gray-200 p-2 rounded w-[200px] focus:outline-none focus:border-blue-500 "
      onChange={onChange}
      onClick={onClick}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} >
          {label}
        </option>
      ))}
    </select>

    </div>
  );
};

export default InputField;
