"use client";

import { useState, FormEvent } from "react";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    favoriteSport: "",
    signUpForUpdates: false,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.favoriteSport) {
      newErrors.favoriteSport = "Favorite sport is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Log form data (replace with API call later)
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);

    // Show success message (you can enhance this with a toast notification)
    alert("Thank you for joining the waitlist! We'll be in touch soon.");

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      favoriteSport: "",
      signUpForUpdates: false,
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors.firstName ? "border-red-400" : "border-white/20"
            } rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors`}
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-transparent border ${
              errors.lastName ? "border-red-400" : "border-white/20"
            } rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors`}
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-transparent border ${
            errors.email ? "border-red-400" : "border-white/20"
          } rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors`}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Favorite Sport */}
      <div>
        <label htmlFor="favoriteSport" className="block text-sm font-medium mb-2">
          Favorite Sport <span className="text-red-400">*</span>
        </label>
        <select
          id="favoriteSport"
          name="favoriteSport"
          value={formData.favoriteSport}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-transparent border ${
            errors.favoriteSport ? "border-red-400" : "border-white/20"
          } rounded-md text-white focus:outline-none focus:border-white/40 transition-colors`}
        >
          <option value="" className="bg-black text-white">
            Select a sport
          </option>
          <option value="football" className="bg-black text-white">
            Football
          </option>
          <option value="basketball" className="bg-black text-white">
            Basketball
          </option>
          <option value="baseball" className="bg-black text-white">
            Baseball
          </option>
          <option value="soccer" className="bg-black text-white">
            Soccer
          </option>
          <option value="hockey" className="bg-black text-white">
            Hockey
          </option>
          <option value="tennis" className="bg-black text-white">
            Tennis
          </option>
          <option value="golf" className="bg-black text-white">
            Golf
          </option>
          <option value="other" className="bg-black text-white">
            Other
          </option>
        </select>
        {errors.favoriteSport && (
          <p className="text-red-400 text-sm mt-1">{errors.favoriteSport}</p>
        )}
      </div>

      {/* Sign up for updates checkbox */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="signUpForUpdates"
          name="signUpForUpdates"
          checked={formData.signUpForUpdates}
          onChange={handleChange}
          className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent text-emerald-400 focus:ring-emerald-400 focus:ring-offset-0 focus:ring-2"
        />
        <label
          htmlFor="signUpForUpdates"
          className="ml-3 text-sm text-gray-300 cursor-pointer"
        >
          Sign up for updates and launch news
        </label>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors resize-none"
          placeholder="Tell us why you're excited about LoveAll (optional)"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
      </button>
    </form>
  );
}
