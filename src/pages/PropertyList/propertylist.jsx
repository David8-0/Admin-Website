/* eslint-disable no-unused-vars */
// src/pages/PropertyList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Paperclip } from "lucide-react";
import Swal from "sweetalert2";
import SearchBar from "../../components/Searchbar/searchbar.jsx";

const NAVY = "#002349";
const DARK = "#001731";
const BORDER_BLUE = "#0BA5FF";

export default function PropertyList() {
  const navigate = useNavigate();

  // --- dropdown/filter state (omitted filtering logic for brevity) ---
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("Property Type");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [selectedPrice, setSelectedPrice] = useState("Average Price");

  // your option lists
  const propertyTypes = [
    "Chalet",
    "Apartments",
    "Twin Villas",
    "Stand Alone Villas",
    "Duplex",
  ];
  const areaOptions = ["<100 m²", "100–150 m²", "150–200 m²", ">200 m²"];
  const priceOptions = ["<1M", "1–2M", "2–3M", "3–4M", "4–5M", ">5M"];

  const toggle = (key) => {
    setShowPropertyType(key === "property" && !showPropertyType);
    setShowArea(key === "area" && !showArea);
    setShowPrice(key === "price" && !showPrice);
  };

  // --- load & manage saved properties ---
  const [list, setList] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("properties") || "[]");
    setList(saved);
  }, []);

  const saveList = (newList) => {
    setList(newList);
    localStorage.setItem("properties", JSON.stringify(newList));
  };

  // --- delete ---
  const handleDelete = (idx) => {
    Swal.fire({
      title: "Delete this property?",
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
        placeholder="Search Properties…"
        wrapperClassName="w-full max-w-md mx-auto"
        inputClassName="bg-[#001731] text-gray-200 placeholder-gray-400"
        buttonClassName="bg-[#002349] hover:bg-[#032d6b]"
        iconClassName="h-4 w-4"
      />
      <div className="mt-4 flex flex-wrap justify-center gap-3 relative">
        {[
          {
            label: selectedProperty,
            open: showPropertyType,
            opts: propertyTypes,
            sel: setSelectedProperty,
            key: "property",
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

      {/* property cards */}
      <div className="mt-6 space-y-6">
        {list.length === 0 && (
          <p className="text-center text-gray-500">No properties added yet.</p>
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
                className="bg-white text-[#002349] text-xs font-semibold rounded-lg px-6 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingIdx !== null && editForm && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white/90 backdrop-blur rounded-lg max-w-xl w-full p-6 space-y-4 overflow-auto max-h-[90vh]"
          >
            <h2 className="text-lg font-semibold mb-2">Edit Property</h2>

            {[
              ["Type", "type"],
              ["Area", "area"],
              ["Bedrooms", "beds"],
              ["Bathrooms", "baths"],
              ["Location", "location"],
              ["Price", "price"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  name={name}
                  value={editForm[name]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 p-2"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                rows={3}
                value={editForm.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, "thumbnail")}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Media</label>
              <input
                type="file"
                onChange={(e) => handleFile(e, "media")}
                className="mt-1"
              />
            </div>

            <div>
              <p className="font-medium text-sm">Features</p>
              <div className="grid grid-cols-2 gap-2">
                {featureList.map((feat) => (
                  <label key={feat} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={editForm.features.includes(feat)}
                      onChange={() => toggleFeature(feat)}
                      className="mr-2"
                    />
                    {feat}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeEdit}
                className="px-4 py-2 rounded border text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#002349] text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
