import FormMessage from "./FormMessage";

const CustomInput = ({
  inputType,
  label,
  name,
  value,
  handleChange,
  error,
  placeholder,
  readonly,
}) => {
  return (
    <div className="form-item">
      <label className="form-label">{label}</label>
      <div className="flex w-full flex-col rounded-lg">
        <input
          placeholder={placeholder}
          className="input-class"
          type={
            inputType === "password"
              ? "password"
              : inputType === "email"
              ? "email"
              : "text"
          }
          name={name}
          value={value}
          onChange={handleChange}
          readOnly={readonly}
        />
        {error && !value && <FormMessage message={`This field is required`} />}
      </div>
    </div>
  );
};

export default CustomInput;
