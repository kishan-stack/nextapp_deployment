// app/college-info/page.tsx

"use client";
import { useState } from "react";
import { data } from "../data.js";
import { useRouter } from "next/navigation";
import Link from "next/link.js";

export default function CollegeInfoForm() {
  const router = useRouter();
  const { colleges, locations, departments, academicYears, skills, interests } = data;

  const [collegeName, setCollegeName] = useState("");
  const [location, setLocation] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Filtered skills and interests based on department selection
  const departmentSkills = departmentName ? skills[departmentName] || [] : [];
  const departmentInterests = departmentName ? interests[departmentName] || [] : [];

  // Update skill selection
  const handleSkillChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Update interest selection
  const handleInterestChange = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      collegeName,
      location,
      departmentName,
      academicYear,
      skills: selectedSkills,
      interests: selectedInterests,
    };
    console.log("Submitted Data:", formData);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto rounded-xl shadow-xl hover:shadow-2xl mt-20 p-4">
      <Link href='/'>Collab.io</Link>
      <h2 className="text-xl font-semibold mb-4">College Information Form</h2>

      {/* Location Dropdown */}
      <div>
        <label className="block font-medium">Location</label>
        <select
          name="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setCollegeName(""); // Reset college name when location changes
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

      {/* College Name Dropdown */}
      <div>
        <label className="block font-medium">College Name</label>
        <select
          name="collegeName"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select College</option>
          {location &&
            colleges[location].map((college) => (
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
          value={departmentName}
          onChange={(e) => {
            setDepartmentName(e.target.value);
            setSelectedSkills([]); // Reset skills on department change
            setSelectedInterests([]); // Reset interests on department change
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
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
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
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
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
                  checked={selectedInterests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
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
