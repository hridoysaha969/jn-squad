const CustomInput = ({ inputType, label, placeholder }) => {
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
        />
        {/* <FormMessage className="form-message mt-2" /> */}
      </div>
    </div>
  );
};

export default CustomInput;
