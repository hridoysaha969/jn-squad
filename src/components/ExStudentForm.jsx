"use client";
import { db } from "@/lib/firebaseConfig";
import { validateFormData } from "@/lib/formValidation";
import { push, ref } from "firebase/database";
import { useState } from "react";

const ExStudentForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, index) => 1990 + index
  ); // Years from 1990 to current year

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    graduationYear: "",
    course: "",
    currentRole: "",
    testimonial: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Usage example
    const errors = validateFormData(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const dbRef = ref(db, "squadUser");
        await push(dbRef, formData);
        console.log("Data submitted successfully:", formData);

        setFormData({
          name: "",
          imageUrl: "",
          graduationYear: "",
          course: "",
          currentRole: "",
          testimonial: "",
          socialLinks: {
            linkedin: "",
            twitter: "",
            github: "",
          },
        });
        setErrors({}); // Clear any errors
      } catch (e) {
        console.log("Error submitting data to Firebase:", e.message);
      }
      setLoading(false);
    } else {
      // Handle errors (e.g., display them to the user)
      console.log(errors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-8 bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl rounded-2xl border-2 border-white border-opacity-20 backdrop-blur-sm dark:from-gray-800 dark:to-gray-800"
    >
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Join as JN Squad
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400"
              placeholder="Enter full name"
            />
            {errors.name && (
              <span className="text-xs text-red-400 py-3">{errors.name}</span>
            )}
          </div>
          {/* Course */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Group
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400"
              placeholder="Enter group name"
            />
            {errors.course && (
              <span className="text-xs text-red-400 py-3">{errors.course}</span>
            )}
          </div>

          {/* Graduation Year Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Graduation Year
            </label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
            >
              <option value="" disabled>
                Select graduation year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.graduationYear && (
              <span className="text-xs text-red-400 py-3">
                {errors.graduationYear}
              </span>
            )}
          </div>

          {/* Current Role */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Position
            </label>
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400"
              placeholder="Enter current position"
            />
            {errors.currentRole && (
              <span className="text-xs text-red-400 py-3">
                {errors.currentRole}
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Testimonial */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Testimonial
            </label>
            <textarea
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400"
              rows="4"
              placeholder="Share your school experience..."
            />
            {errors.testimonial && (
              <span className="text-xs text-red-400 py-3">
                {errors.testimonial}
              </span>
            )}
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Social Links {"(Optional)"}
            </label>
            <input
              type="text"
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400 mb-2"
              placeholder="LinkedIn URL"
            />
            {errors.linkedin && (
              <span className="text-xs text-red-400 py-3">
                {errors.linkedin}
              </span>
            )}
            <input
              type="text"
              name="socialLinks.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400 mb-2"
              placeholder="Twitter URL"
            />
            {errors.twitter && (
              <span className="text-xs text-red-400 py-3">
                {errors.twitter}
              </span>
            )}
            <input
              type="text"
              name="socialLinks.github"
              value={formData.socialLinks.github}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border outline-none dark:bg-gray-700 border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400 mb-2"
              placeholder="GitHub URL"
            />
            {errors.github && (
              <span className="text-xs text-red-400 py-3">{errors.github}</span>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-fit py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
};

export default ExStudentForm;
