// app/college-info/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "react-toastify";
import { data } from "../data.js";

const initialFormState = {
  collegeName: "",
  location: "",
  departmentName: "",
  academicYear: "",
  skills: [],
  interests: [],
};

export default function CollegeInfoForm() {
  const { user, isLoading } = useKindeAuth();
  
  const router = useRouter();
  const { colleges, locations, departments, academicYears, skills, interests } = data;

  const [formData, setFormData] = useState(initialFormState);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You must be logged in to access this form.</div>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    };
    

    try {
      await axios.post("http://localhost:5000/register", payload);
      toast.success("Profile created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error. Please try again.");
    }
  };

  // Filtered skills and interests based on department
  const departmentSkills = formData.departmentName
    ? skills[formData.departmentName] || []
    : [];
  const departmentInterests = formData.departmentName
    ? interests[formData.departmentName] || []
    : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto rounded-xl shadow-xl hover:shadow-2xl mt-20 p-4"
    >
      <Link href="/">Collab.io</Link>
      <h2 className="text-xl font-semibold mb-4">College Information Form</h2>

      {/* Location Dropdown */}
      <div>
        <label className="block font-medium">Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={(e) => {
            handleChange(e);
            setFormData((prev) => ({ ...prev, collegeName: "" }));
          }}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Location</option>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* College Dropdown */}
      <div>
        <label className="block font-medium">College Name</label>
        <select
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select College</option>
          {formData.location &&
            colleges[formData.location].map((college) => (
              <option key={college} value={college}>
                {college}
              </option>
            ))}
        </select>
      </div>

      {/* Department Dropdown */}
      <div>
        <label className="block font-medium">Department Name</label>
        <select
          name="departmentName"
          value={formData.departmentName}
          onChange={(e) => {
            handleChange(e);
            setFormData((prev) => ({ ...prev, skills: [], interests: [] }));
          }}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Academic Year Dropdown */}
      <div>
        <label className="block font-medium">Academic Year</label>
        <select
          name="academicYear"
          value={formData.academicYear}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Year</option>
          {academicYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Skills Checkboxes */}
      {departmentSkills.length > 0 && (
        <div>
          <label className="block font-medium">Skills</label>
          <div className="flex flex-wrap gap-2">
            {departmentSkills.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleCheckboxChange("skills", skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Interests Checkboxes */}
      {departmentInterests.length > 0 && (
        <div>
          <label className="block font-medium">Interests</label>
          <div className="flex flex-wrap gap-2">
            {departmentInterests.map((interest) => (
              <label key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleCheckboxChange("interests", interest)}
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );
}
