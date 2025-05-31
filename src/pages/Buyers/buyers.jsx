// src/pages/BuyerPage.jsx
import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import Swal from "sweetalert2";

import avatar1 from "../../assets/Buyer/1.svg";
import avatar2 from "../../assets/Buyer/2.svg";
import avatar3 from "../../assets/Buyer/3.svg";
import avatar4 from "../../assets/Buyer/4.svg";
import avatar5 from "../../assets/Buyer/5.svg";

const navy = "#002349";

const initialBuyers = [
  {
    id: "#ID01234",
    name: "Mohamed Ahmed",
    joinDate: "05/01/2025, 12:42 AM",
    phone: "+20 01492452424",
    email: "user123@gmail.com",
    avatar: avatar1,
  },
  {
    id: "#ID01235",
    name: "Amina El-Sayed",
    joinDate: "04/12/2024, 08:15 PM",
    phone: "+20 01234567890",
    email: "amina@example.com",
    avatar: avatar2,
  },
  {
    id: "#ID01236",
    name: "Omar Farouk",
    joinDate: "02/10/2024, 10:05 AM",
    phone: "+20 01112223344",
    email: "omar.farouk@mail.com",
    avatar: avatar3,
  },
  {
    id: "#ID01237",
    name: "Sara Mahmoud",
    joinDate: "12/09/2024, 02:30 PM",
    phone: "+20 01099887766",
    email: "sara.m@example.com",
    avatar: avatar4,
  },
  {
    id: "#ID01238",
    name: "Khaled Naguib",
    joinDate: "23/08/2024, 06:47 AM",
    phone: "+20 01556677889",
    email: "khaled.nag@mail.com",
    avatar: avatar5,
  },
];

export default function BuyerPage() {
  const [buyers, setBuyers] = useState(initialBuyers);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This buyer will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setBuyers((prev) => prev.filter((b) => b.id !== id));
        Swal.fire("Deleted!", "The buyer has been removed.", "success");
      }
    });
  };

  const handleEdit = (buyer) => {
    Swal.fire({
      title: "Edit Buyer",
      html:
        `<input id="swal-id" class="swal2-input" placeholder="ID" value="${buyer.id}">` +
        `<input id="swal-name" class="swal2-input" placeholder="Name" value="${buyer.name}">` +
        `<input id="swal-joinDate" class="swal2-input" placeholder="Join Date" value="${buyer.joinDate}">` +
        `<input id="swal-phone" class="swal2-input" placeholder="Phone" value="${buyer.phone}">` +
        `<input id="swal-email" class="swal2-input" placeholder="Email" value="${buyer.email}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          id: document.getElementById("swal-id").value,
          name: document.getElementById("swal-name").value,
          joinDate: document.getElementById("swal-joinDate").value,
          phone: document.getElementById("swal-phone").value,
          email: document.getElementById("swal-email").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setBuyers((prev) =>
          prev.map((b) => (b.id === buyer.id ? { ...b, ...result.value } : b))
        );
        Swal.fire("Updated!", "Buyer information was updated.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top bar + pill */}
      <div style={{ background: navy }} className="h-12" />
      <div className="relative -mt-1 flex justify-center">
        <span
          style={{ background: navy }}
          className="rounded-b-lg px-6 py-3 text-lg font-semibold text-white"
        >
          Buyer
        </span>
      </div>

      {/* buyer list */}
      <div className="mx-auto mt-8 max-w-3xl space-y-6 px-4">
        {buyers.map((b) => (
          <article
            key={b.id}
            className="flex flex-col sm:flex-row sm:items-start justify-between rounded-lg border border-gray-300 p-4 min-h-[180px] gap-4"
          >
            {/* Avatar */}
            <div className="mx-auto sm:mx-0 h-24 w-24 sm:h-50 sm:w-40 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={b.avatar}
                alt={b.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Left Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* IDddddddddd */}
              <div className="text-sm text-gray-500">{b.id}</div>
              <div className="text-lg font-semibold text-gray-900">
                {b.name}
              </div>
              <div className="text-xs text-gray-500">
                Joined on {b.joinDate}
              </div>
            </div>

            {/* Right: Contact + Buttons */}
            <div className="flex flex-col sm:items-end items-center justify-between min-w-[220px] w-full sm:w-auto">
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row sm:gap-8 text-center sm:text-right">
                {/* Phone */}
                <div>
                  <div className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                    phone number
                  </div>
                  <div className="text-sm text-gray-800">{b.phone}</div>
                </div>
                {/* Email */}
                <div className="mt-2 sm:mt-0">
                  <div className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                    email
                  </div>
                  <div className="text-sm text-gray-800">{b.email}</div>
                </div>
              </div>

              {/* Icons */}
              <div className="mt-4 flex gap-x-4">
                <Trash2
                  size={20}
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => handleDelete(b.id)}
                />
                <Edit2
                  size={20}
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => handleEdit(b)}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
