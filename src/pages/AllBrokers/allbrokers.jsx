import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/land.svg";
import Swal from "sweetalert2";
const NAVY = "#002349";

export default function AllBrokers() {
  const [brokers, setBrokers] = useState([]);

  /* ─────────── load saved brokers ─────────── */
  useEffect(() => {
    setBrokers(JSON.parse(localStorage.getItem("brokers") || "[]"));
  }, []);

  /* ─────────── delete broker card ─────────── */
  const removeBroker = (id) => {
    const next = brokers.filter((b) => b.id !== id);
    localStorage.setItem("brokers", JSON.stringify(next));
    setBrokers(next);
  };
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Delete this broker?",
      text: "This action can’t be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      padding: "1.5rem",
    }).then((result) => {
      if (result.isConfirmed) {
        removeBroker(id);
        Swal.fire({
          title: "Deleted!",
          text: "The broker has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <section className="min-h-screen bg-gray-50 font-sans">
      {/* ───────────────── banner ───────────────── */}
      <div
        className="flex h-100 w-full items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <span
          className="-mb-7 rounded px-6 py-1 text-sm font-semibold text-white"
          style={{ backgroundColor: NAVY }}
        >
          Broker Card View
        </span>
      </div>

      {/* ───────────────── main content ───────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* heading + “Add New” */}
        <div className="relative mb-10 flex items-center justify-center">
          <h2 className="text-xs font-semibold tracking-wide text-gray-700">
            All Brokers / All Brokers listing
          </h2>

          <Link
            to="/add-broker"
            className="absolute right-0 rounded-full px-5 py-[3px] text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            Add New
          </Link>
        </div>

        {/* grid of cards */}
        {brokers.length === 0 ? (
          <p className="pt-20 text-center text-sm text-gray-400">
            No brokers added yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brokers.map((b) => (
              <article
                key={b.id}
                className="relative rounded-md border border-gray-300 bg-[#D9D9D9] p-4 shadow-sm text-[20px] font-semibold text-gray-800"
              >
                {/* avatar */}
                <div className="flex justify-center">
                  {b.avatar ? (
                    <img
                      src={b.avatar}
                      alt={`${b.firstName} ${b.lastName}`}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-300" />
                  )}
                </div>

                {/* name + title */}
                <h3 className="mt-2 text-center capitalize text-gray-900">
                  {b.firstName} {b.lastName}
                </h3>
                <p className="-mt-1 text-center capitalize text-gray-600 text-[16px]">
                  {b.title || "real-estate broker"}
                </p>

                {/* description */}
                <p className="mt-3 leading-6">
                  Answering guest inquiries, directing phone calls, coordinating
                  travel plans, and more
                </p>

                {/* contact info */}
                <div className="mt-3 space-y-1">
                  <p>
                    <span className="font-semibold">Email:</span> {b.email}
                  </p>
                  <p>
                    <span className="font-semibold">phone number:</span>{" "}
                    {b.phone}
                  </p>
                </div>

                {/* delete button */}
                <button
                  onClick={() => handleDeleteClick(b.id)}
                  className="absolute bottom-3 right-3 text-gray-600 transition-colors hover:text-red-600"
                  title="Delete broker"
                >
                  <Trash2 size={20} />
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
