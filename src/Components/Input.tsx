import React from "react";
export const Input = ({
  helperText = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  startAdornment = <></>,
  endAdornment = <></>,
  type,
}: {
  helperText?: string;
  placeholder: string;
  value: string;
  onChange: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  startAdornment?: any;
  endAdornment?: any;
  type?: React.HTMLInputTypeAttribute;
}) => {
  return (
    <div>
      {!!helperText && <h1 className="text-slate-400">{helperText}</h1>}
      <div className="flex flex-row items-center bg-slate-300 py-2 px-2 rounded space-x-2">
        {startAdornment}
        <input
          {...{ placeholder, value, onChange, type }}
          className=" bg-slate-300 placeholder-slate-500 text-slate-800 rounded focus:outline-none focus:bg-slate-300"
        />
        {endAdornment}
      </div>
    </div>
  );
};
