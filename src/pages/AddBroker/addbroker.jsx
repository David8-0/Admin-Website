import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={name} className="text-[11px] font-semibold text-white">
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="h-6 w-full rounded-full bg-white px-3 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

const navy = "#002349";

export default function AddBroker() {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    dob: "",
    title: "",
    country: "",
    address: "",
    brokerId: "",
    postalCode: "",
    email: "",
    phone: "",
    previousAgency: "",
    agency: "",
    agentLicense: "",
    taxNumber: "",
  };

  const [broker, setBroker] = useState(initialState);
  const [avatar, setAvatar] = useState(null);

  /* handle change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBroker((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    const allFilled = Object.values(broker).every(
      (v) => v !== null && v !== undefined && String(v).trim() !== ""
    );

    if (!allFilled || !avatar) {
      Swal.fire("Error", "Please fill in all fields and add a photo", "error");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("brokers") || "[]");
    stored.push({
      id: Date.now(),
      ...broker,
      avatar,
    });
    localStorage.setItem("brokers", JSON.stringify(stored));

    Swal.fire({
      icon: "success",
      title: "Broker added successfully!",
      showConfirmButton: false,
      timer: 1200,
    }).then(() => {
      navigate("/view-brokers");
    });
  };

  /* cancel */
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Unsaved data will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
    }).then((r) => {
      if (r.isConfirmed) navigate("/view-brokers");
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  /* ---------- JSX ---------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ background: navy }} className="h-12" />
      <div className="relative -mt-1 flex justify-center">
        <span
          style={{ background: navy }}
          className="rounded-b-lg px-8 py-3 text-sm font-semibold text-white"
        >
          Add Broker
        </span>
      </div>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8">
        {/* Personal Info */}
        <section style={{ background: navy }} className="rounded-lg p-6 pt-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <label className="relative mx-auto sm:mx-0 h-24 w-24 rounded-lg bg-white border-2 border-dashed border-gray-400 cursor-pointer overflow-hidden flex items-center justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <Plus size={24} />
                  <span className="text-[10px]">Add Photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>

            {/* Inputs */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                ["First Name", "firstName"],
                ["Last Name", "lastName"],
                ["Date of Birth", "dob", "date"],
                ["Title", "title"],
                ["Country", "country"],
                ["Broker ID", "brokerId"],
                ["Address", "address"],
                ["Postal Code", "postalCode"],
                ["Email", "email", "email"],
                ["Phone Number", "phone"],
              ].map(([lbl, name, type]) => (
                <InputField
                  key={name}
                  label={lbl}
                  name={name}
                  type={type}
                  value={broker[name]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Broker Detail */}
        <section
          style={{ background: navy }}
          className="rounded-lg p-6 pt-8 space-y-6"
        >
          <h2 className="text-lg font-semibold text-white">Broker Detail</h2>

          <div className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-4">
            {[
              ["Previous Agency", "previousAgency"],
              ["Agency", "agency"],
              ["Agent License", "agentLicense"],
              ["Tax Number", "taxNumber"],
            ].map(([lbl, name]) => (
              <React.Fragment key={name}>
                <label className="self-center text-white">{lbl}:</label>
                <InputField
                  name={name}
                  value={broker[name]}
                  onChange={handleChange}
                />
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={handleConfirm}
            style={{ background: navy }}
            className="w-28 rounded-full py-1 text-sm font-semibold text-white hover:opacity-90"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            style={{ background: navy }}
            className="w-28 rounded-full border text-sm font-semibold text-white hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
