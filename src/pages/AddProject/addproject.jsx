import React, { useState } from "react";
import { Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NAVY = "#002349";
const BORDER_BLUE = "#0BA5FF";

export default function AddProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    developer: "",
    area: "",
    price: "",
    type: "",
    beds: "",
    baths: "",
    location: "",
    description: "",
    media: null,
    features: [],
    thumbnail: null,
  });

  const featureList = [
    "Parking In The Area",
    "Air Conditioning",
    "Security Guard",
    "Terrace",
    "Elevator Lift",
    "Balcony",
    "SuperMarket",
  ];

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const toggleFeature = (feat) =>
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, [key]: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required text fields
    const required = [
      "developer",
      "area",
      "price",
      "type",
      "beds",
      "baths",
      "location",
      "description",
    ];

    // Check empties
    const missing = required.filter((key) => !form[key]?.toString().trim());
    if (missing.length > 0 || !form.thumbnail) {
      return Swal.fire({
        icon: "error",
        title: "Incomplete information",
        text: "Please complete all fields and add a thumbnail.",
        confirmButtonColor: NAVY,
      });
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("projects") || "[]");
    existing.push(form);
    localStorage.setItem("projects", JSON.stringify(existing));

    // Success alert then redirect
    Swal.fire({
      icon: "success",
      title: "Added successfully!",
      text: "Your project has been saved.",
      confirmButtonColor: NAVY,
    }).then(() => {
      navigate("/view-project");
    });
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans pb-12">
        {/* top ribbon */}
        <div className="flex justify-center">
          <span
            className=" rounded px-8 py-[6px] text-sm font-semibold text-white -mt-1"
            style={{ backgroundColor: NAVY }}
          >
            Add Project
          </span>
        </div>

        {/* blue container */}
        <form
          id="projectForm"
          onSubmit={handleSubmit}
          className="mx-auto mt-6 w-[90%] max-w-3xl rounded border-2 p-6 sm:p-8"
          style={{ borderColor: BORDER_BLUE, backgroundColor: NAVY }}
        >
          {/* thumbnail + fields */}
          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            {/* image picker */}
            <label className="group relative block h-40 w-40 overflow-hidden rounded">
              {form.thumbnail ? (
                <img
                  src={form.thumbnail}
                  alt="thumbnail"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-semibold text-gray-600">
                  Click to add photo
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => handleFile(e, "thumbnail")}
              />
            </label>

            {/* six small inputs + location */}
            <div className="grid grid-cols-2 gap-4 text-[11px] font-semibold text-white md:grid-cols-3">
              {[
                ["Project Developer", "developer"],
                ["Project Area", "area"],
                ["Project Price", "price"],
                ["Project Type", "type"],
                ["No Of Bedrooms", "beds"],
                ["No Of Bathrooms", "baths"],
              ].map(([label, name]) => (
                <div key={name} className="space-y-[2px]">
                  <label htmlFor={name}>{label}</label>
                  <input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="h-5 w-full rounded bg-white px-2 text-[10px] text-gray-900 outline-none"
                  />
                </div>
              ))}
              <div className="col-span-2 md:col-span-3 space-y-[2px]">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="h-5 w-full rounded bg-white px-2 text-[10px] text-gray-900 outline-none"
                />
              </div>
            </div>
          </div>

          {/* description */}
          <div className="mt-6 space-y-[2px] text-sm text-white">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded bg-white p-2 text-[13px] text-gray-900 outline-none"
            />
          </div>

          {/* media upload */}
          <div className="mt-6 space-y-[2px] text-sm text-white">
            <label>Media:</label>
            <div className="relative">
              <input
                type="file"
                accept="*/*"
                onChange={(e) => handleFile(e, "media")}
                className="h-8 w-full rounded bg-white px-3 py-[3px] text-[12px] text-gray-900 outline-none file:hidden"
              />
              <Paperclip
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
              />
            </div>
          </div>

          {/* features checklist */}
          <div className="mt-6 text-sm text-white">
            <p className="mb-2 font-semibold">Additional features:</p>
            <div className="grid grid-cols-2 gap-y-1 text-[13px]">
              {featureList.map((feat) => (
                <label key={feat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.features.includes(feat)}
                    onChange={() => toggleFeature(feat)}
                    className="h-3 w-3 accent-white"
                  />
                  <span>{feat}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* buttons outside the blue container */}
      <div className="flex justify-center gap-6 -mt-4 mb-8">
        <button
          type="submit"
          form="projectForm"
          className="w-32 rounded-xl py-[6px] text-sm font-semibold text-white border border-white shadow-md transition-all hover:bg-white hover:text-[#002349]"
          style={{ backgroundColor: NAVY }}
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="w-32 rounded-xl py-[6px] text-sm font-semibold text-white border border-white shadow-md transition-all hover:bg-white hover:text-[#002349]"
          style={{ backgroundColor: NAVY }}
        >
          Cancel
        </button>
      </div>
    </>
  );
} 