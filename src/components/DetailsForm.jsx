import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { useAuth } from "@/context/AuthContext";
import { fetchSingleUser } from "@/services/fetchSingleUser";
import { ref, update } from "firebase/database";
import { db } from "@/lib/firebaseConfig";
import { updateProfile } from "firebase/auth";

const DetailsForm = () => {
  const [details, setDetails] = useState({
    displayName: "",
    address: "",
    group: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const userData = await fetchSingleUser(currentUser?.uid);
      setDetails(userData);
    };
    getData();
  }, [currentUser]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  if (!currentUser) return;

  const handleSubmit = async () => {
    if (!details.address || !details.group) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const updateRef = ref(db, `users/${currentUser.uid}`);

      await update(updateRef, details);

      console.log("Data updated");
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <CustomInput
        label="Full Name"
        name="displayName"
        placeholder="Enter Full Name"
        value={currentUser?.displayName || details.displayName}
        handleChange={handleChange}
        error={error}
        readonly={true}
      />
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6 mt-2">
        <div className="md:w-1/2 w-full">
          <CustomInput
            label="Address"
            name="address"
            placeholder="Your present address"
            value={currentUser?.address || details.address}
            handleChange={handleChange}
            error={error}
          />
        </div>
        <div className="md:w-1/2 w-full">
          <CustomInput
            label="Group"
            name="group"
            placeholder="Your group"
            value={currentUser?.group || details.group}
            handleChange={handleChange}
            error={error}
          />
        </div>
      </div>

      <button
        className="bg-violet-600 disabled:bg-gray-500 text-sm text-white rounded-full py-2 px-4 capitalize"
        onClick={handleSubmit}
        disabled={loading}
      >
        Save Changes
      </button>
    </div>
  );
};

export default DetailsForm;
