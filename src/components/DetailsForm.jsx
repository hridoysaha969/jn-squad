import { useState } from "react";
import CustomInput from "./CustomInput";

const DetailsForm = () => {
  const [details, setDetails] = useState({
    fullName: "",
    address: "",
    group: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-6">
      <CustomInput
        label="Full Name"
        name="fullName"
        placeholder="Enter Full Name"
        value={details.fullName}
        handleChange={handleChange}
        error={error}
      />
      <div className="flex justify-between items-center gap-2 mb-6 mt-2">
        <div className="w-1/2">
          <CustomInput
            label="Address"
            name="address"
            placeholder="Your present address"
            value={details.address}
            handleChange={handleChange}
            error={error}
          />
        </div>
        <div className="w-1/2">
          <CustomInput
            label="Group"
            name="group"
            placeholder="Select group"
            value={details.group}
            handleChange={handleChange}
            error={error}
          />
        </div>
      </div>

      <button className="bg-violet-600 text-sm text-white rounded-full py-2 px-4 capitalize">
        Save Changes
      </button>
    </div>
  );
};

export default DetailsForm;
