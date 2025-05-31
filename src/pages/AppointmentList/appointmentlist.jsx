// src/components/AppointmentList.jsx

const appointments = [
  {
    id: "#AD01234",
    date: "25/04/2025",
    buyer: "James Wheelock",
    property: "Central Park 2851",
    location: "Center London",
    price: "2,000,000 GBP",
    type: "Sale",
    broker: "Kevin A.",
    status: "Pending",
  },
  {
    id: "#AD01235",
    date: "26/04/2025",
    buyer: "Amir Tawfik",
    property: "Seaside Villa",
    location: "Alexandria",
    price: "1,500,000 EGP",
    type: "Rent",
    broker: "Broker 1",
    status: "Done",
  },
  {
    id: "#AD01236",
    date: "27/04/2025",
    buyer: "Ahmed Salah",
    property: "Mountain Cabin",
    location: "Denver",
    price: "850,000 USD",
    type: "Sale",
    broker: "Broker 2",
    status: "Pending",
  },
  {
    id: "#AD01237",
    date: "28/04/2025",
    buyer: "Sara Hassan",
    property: "Beach House",
    location: "Miami",
    price: "3,200,000 USD",
    type: "Sale",
    broker: "Broker 3",
    status: "Pending",
  },
  {
    id: "#AD01238",
    date: "29/04/2025",
    buyer: "John Doe",
    property: "City Apartment",
    location: "New York",
    price: "1,200,000 USD",
    type: "Rent",
    broker: "Broker 4",
    status: "Done",
  },
  {
    id: "#AD01239",
    date: "30/04/2025",
    buyer: "Mary Smith",
    property: "Country Cottage",
    location: "Cotswolds",
    price: "950,000 GBP",
    type: "Sale",
    broker: "Kevin A.",
    status: "Pending",
  },
  {
    id: "#AD01240",
    date: "01/05/2025",
    buyer: "Ali Ahmed",
    property: "Penthouse",
    location: "Dubai",
    price: "4,500,000 AED",
    type: "Sale",
    broker: "Broker 1",
    status: "Pending",
  },
  {
    id: "#AD01241",
    date: "02/05/2025",
    buyer: "Lina Khan",
    property: "Studio Flat",
    location: "Paris",
    price: "750,000 EUR",
    type: "Rent",
    broker: "Broker 2",
    status: "Done",
  },
  {
    id: "#AD01242",
    date: "03/05/2025",
    buyer: "Omar Farouk",
    property: "Lake House",
    location: "Zurich",
    price: "2,800,000 CHF",
    type: "Sale",
    broker: "Broker 3",
    status: "Pending",
  },
  {
    id: "#AD01243",
    date: "04/05/2025",
    buyer: "Eve Johnson",
    property: "Ranch",
    location: "Texas",
    price: "1,100,000 USD",
    type: "Sale",
    broker: "Broker 4",
    status: "Pending",
  },
];

export default function AppointmentList() {
  return (
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-primary">
              <tr>
                {[
                  "Appointment ID",
                  "Date",
                  "Buyer",
                  "Property",
                  "Location",
                  "Price",
                  "Type",
                  "Broker",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.broker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
