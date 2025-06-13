// src/components/AddProperty.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES, PROPERTY_STATUS } from "../../../utils/constants";

const NAVY = "#002349";
const BORDER_BLUE = "#0BA5FF";

export default function AddProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    areaRange: "",
    priceRange: "",
    status: "available",
    bedrooms: "",
    bathrooms: "",
    images: null,
  });

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check if all files are images
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please upload only image files (JPEG, PNG, etc.)",
        confirmButtonColor: NAVY,
      });
      return;
    }

    // Read all files
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    // Update form with all images
    Promise.all(readers).then(results => {
      setForm(prev => ({ ...prev, images: results }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields
    const required = [
      "title",
      "description",
      "type",
      "areaRange",
      "priceRange",
      "bedrooms",
      "bathrooms",
    ];

    // Check empties
    const missing = required.filter((key) => !form[key]?.toString().trim());
    if (missing.length > 0) {
      return Swal.fire({
        icon: "error",
        title: "Incomplete information",
        text: "Please complete all required fields.",
        confirmButtonColor: NAVY,
      });
    }

    // Log form values
    console.log('Form Values:', {
      title: form.title,
      description: form.description,
      type: form.type,
      areaRange: form.areaRange,
      priceRange: form.priceRange,
      status: form.status,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      images: form.images
    });

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("properties") || "[]");
    existing.push(form);
    localStorage.setItem("properties", JSON.stringify(existing));

    // Success alert then redirect
    Swal.fire({
      icon: "success",
      title: "Added successfully!",
      text: "Your property has been saved.",
      confirmButtonColor: NAVY,
    }).then(() => {
      navigate("/view-property");
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
            className="rounded px-8 py-[6px] text-sm font-semibold text-white -mt-1"
            style={{ backgroundColor: NAVY }}
          >
            Add Property
          </span>
        </div>

        {/* blue container */}
        <form
          id="propertyForm"
          onSubmit={handleSubmit}
          className="mx-auto mt-6 w-[90%] max-w-3xl rounded border-2 p-6 sm:p-8"
          style={{ borderColor: BORDER_BLUE, backgroundColor: NAVY }}
        >
          {/* image picker */}
          <div className="mb-6">
            <label className="group relative block h-40 w-40 overflow-hidden rounded">
              {form.images ? (
                <img
                  src={form.images[0]}
                  alt="property"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-semibold text-gray-600">
                  Click to add photo
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/gif"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleFile}
                multiple={true}
              />
            </label>
          </div>

          {/* form fields */}
          <div className="grid gap-4 text-sm text-white">
            <div className="space-y-[2px]">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
              />
            </div>

            <div className="space-y-[2px]">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded bg-white p-2 text-gray-900 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-[2px]">
                <label htmlFor="type">Property Type</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  <option value="">Select Type</option>
                  {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="areaRange">Area Range</label>
                <select
                  id="areaRange"
                  name="areaRange"
                  value={form.areaRange}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  <option value="">Select Area</option>
                  {Object.entries(AREA_RANGES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="priceRange">Price Range</label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={form.priceRange}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  <option value="">Select Price</option>
                  {Object.entries(PRICE_RANGES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  {Object.entries(PROPERTY_STATUS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="1"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                />
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="1"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* buttons outside the blue container */}
      <div className="flex justify-center gap-6 -mt-4 mb-8">
        <button
          type="submit"
          form="propertyForm"
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
