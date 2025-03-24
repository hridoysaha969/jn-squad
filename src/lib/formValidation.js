export const validateFormData = (formData) => {
  const errors = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  // Validate graduationYear (should be a number and within a reasonable range)
  if (!formData.graduationYear) {
    errors.graduationYear = "Graduation year is required";
  } else if (
    isNaN(formData.graduationYear) ||
    formData.graduationYear < 1900 ||
    formData.graduationYear > new Date().getFullYear()
  ) {
    errors.graduationYear = "Invalid graduation year";
  }

  // Validate course
  if (!formData.course.trim()) {
    errors.course = "Course is required";
  }

  // Validate currentRole
  if (!formData.currentRole.trim()) {
    errors.currentRole = "Current role is required";
  }

  // Validate testimonial
  if (!formData.testimonial.trim()) {
    errors.testimonial = "Testimonial is required";
  }

  // Validate social links (must contain the correct domain)
  if (
    formData.socialLinks.linkedin &&
    !formData.socialLinks.linkedin.includes("linkedin.com")
  ) {
    errors.linkedin = "Invalid LinkedIn URL (must contain 'linkedin.com')";
  }
  if (
    formData.socialLinks.twitter &&
    !formData.socialLinks.twitter.includes("twitter.com")
  ) {
    errors.twitter = "Invalid Twitter URL (must contain 'twitter.com')";
  }
  if (
    formData.socialLinks.github &&
    !formData.socialLinks.github.includes("github.com")
  ) {
    errors.github = "Invalid GitHub URL (must contain 'github.com')";
  }

  return errors;
};
