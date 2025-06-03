/* eslint-disable no-unused-vars */
// src/pages/ProjectList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Paperclip } from "lucide-react";
import Swal from "sweetalert2";
import SearchBar from "../../components/Searchbar/searchbar.jsx";

const NAVY = "#002349";
const DARK = "#001731";
const BORDER_BLUE = "#0BA5FF";

export default function ProjectList() {
  const navigate = useNavigate();

  // --- dropdown/filter state (omitted filtering logic for brevity) ---
  const [showProjectType, setShowProjectType] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedProject, setSelectedProject] = useState("Project Type");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [selectedPrice, setSelectedPrice] = useState("Average Price");

  // your option lists
  const projectTypes = [
    "Chalet",
    "Apartments",
    "Twin Villas",
    "Stand Alone Villas",
    "Duplex",
  ];
  const areaOptions = ["<100 m²", "100–150 m²", "150–200 m²", ">200 m²"];
  const priceOptions = ["<1M", "1–2M", "2–3M", "3–4M", "4–5M", ">5M"];

  const toggle = (key) => {
    setShowProjectType(key === "project" && !showProjectType);
    setShowArea(key === "area" && !showArea);
    setShowPrice(key === "price" && !showPrice);
  };

  // --- load & manage saved projects ---
  const [list, setList] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    setList(saved);
  }, []);

  const saveList = (newList) => {
    setList(newList);
    localStorage.setItem("projects", JSON.stringify(newList));
  };

  // --- delete ---
  const handleDelete = (idx) => {
    Swal.fire({
      title: "Delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: NAVY,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then((res) => {
      if (res.isConfirmed) {
        const next = [...list];
        next.splice(idx, 1);
        saveList(next);
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  // --- edit modal state ---
  const [editingIdx, setEditingIdx] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const openEdit = (idx) => {
    setEditingIdx(idx);
    // deep clone
    setEditForm({ ...list[idx] });
  };
  const closeEdit = () => {
    setEditingIdx(null);
    setEditForm(null);
  };

  // form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((p) => ({ ...p, [name]: value }));
  };
  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setEditForm((p) => ({ ...p, [key]: reader.result }));
    reader.readAsDataURL(file);
  };

  const toggleFeature = (feat) => {
    setEditForm((p) => ({
      ...p,
      features: p.features.includes(feat)
        ? p.features.filter((f) => f !== feat)
        : [...p.features, feat],
    }));
  };

  // save edited
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // validate
    const required = ["type", "area", "beds", "baths", "location", "price"];
    const missing = required.filter((k) => !editForm[k]);
    if (missing.length) {
      return Swal.fire({
        icon: "error",
        title: "Incomplete",
        text: "Please fill all required fields",
        confirmButtonColor: NAVY,
      });
    }
    // commit
    const updated = [...list];
    updated[editingIdx] = editForm;
    saveList(updated);
    Swal.fire({
      icon: "success",
      title: "Saved!",
      timer: 1200,
      showConfirmButton: false,
    });
    closeEdit();
  };

  const featureList = [
    "Parking In The Area",
    "Air Conditioning",
    "Security Guard",
    "Terrace",
    "Elevator Lift",
    "Balcony",
    "SuperMarket",
  ];

  return (
    <section className="bg-white pt-6 pb-14 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Search & Filters (same as before) */}
      <SearchBar
        placeholder="Search Projects…"
        wrapperClassName="w-full max-w-md mx-auto"
        inputClassName="bg-[#001731] text-gray-200 placeholder-gray-400"
        buttonClassName="bg-[#002349] hover:bg-[#032d6b]"
        iconClassName="h-4 w-4"
      />
      <div className="mt-4 flex flex-wrap justify-center gap-3 relative">
        {[
          {
            label: selectedProject,
            open: showProjectType,
            opts: projectTypes,
            sel: setSelectedProject,
            key: "project",
            width: "w-48",
          },
          {
            label: selectedArea,
            open: showArea,
            opts: areaOptions,
            sel: setSelectedArea,
            key: "area",
            width: "w-56",
          },
          {
            label: selectedPrice,
            open: showPrice,
            opts: priceOptions,
            sel: setSelectedPrice,
            key: "price",
            width: "w-52",
          },
        ].map(({ label, open, opts, sel, key, width }) => (
          <div key={key} className="relative">
            <button
              onClick={() => toggle(key)}
              className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
            >
              {label} <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {open && (
              <ul
                className={`absolute mt-2 ${width} bg-white text-${DARK} rounded shadow z-20 text-sm`}
              >
                {opts.map((o) => (
                  <li
                    key={o}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      sel(o);
                      toggle(key);
                    }}
                  >
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* project cards */}
      <div className="mt-6 space-y-6">
        {list.length === 0 && (
          <p className="text-center text-gray-500">No projects added yet.</p>
        )}
        {list.map((p, idx) => (
          <div
            key={idx}
            className="flex flex-wrap items-center bg-[#002349] rounded-xl p-4 shadow-lg"
          >
            <img
              src={p.thumbnail}
              alt={p.type}
              className="w-full md:w-72 h-44 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 text-white ml-4 space-y-1">
              <p>
                <span className="font-semibold">Type:</span> {p.type}
              </p>
              <p>
                <span className="font-semibold">Area:</span> {p.area}
              </p>
              <p>
                <span className="font-semibold">Bedrooms:</span> {p.beds}
              </p>
              <p>
                <span className="font-semibold">Bathrooms:</span> {p.baths}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {p.location}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {p.price}
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-2 ml-auto mt-4 md:mt-0">
              <button
                onClick={() => openEdit(idx)}
                className="bg-white text-[#002349] text-xs font-semibold rounded-lg px-6 py-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="bg-red-500 text-white text-xs font-semibold rounded-lg px-6 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* edit modal */}
      {editingIdx !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={editForm.type}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={editForm.area}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <input
                    type="text"
                    name="beds"
                    value={editForm.beds}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <input
                    type="text"
                    name="baths"
                    value={editForm.baths}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={editForm.price}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {featureList.map((feat) => (
                    <label key={feat} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.features.includes(feat)}
                        onChange={() => toggleFeature(feat)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{feat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
} 