export const Input = ({
  placeholder = "",
  value = "",
  onChange = () => {},
  startAdornment = <></>,
  endAdornment = <></>,
}) => {
  return (
    <div className="inline-flex flex-row items-center bg-slate-300 py-2 px-2 rounded space-x-2">
      {startAdornment}
      <input
        {...{ value, placeholder, onChange }}
        class=" bg-slate-300 placeholder-slate-500 text-slate-600 rounded focus:outline-none focus:bg-slate-300"
      />
      {endAdornment}
    </div>
  );
};
