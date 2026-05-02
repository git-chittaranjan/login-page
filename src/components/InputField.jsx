
const InputField = ({ label, type = "text", name, value, onChange, error, rightElement, disabled = false, autoComplete, inputMode, placeholder, }) => {

  const errorId = `${name}-error`;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-950 md:text-gray-100">{label}</label>

      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`mt-1 block w-full px-3 py-2 border rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-gray-600"}
            ${rightElement ? "pr-10" : ""}`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</div>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;