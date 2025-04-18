import React, { useState } from "react";

const programList = [
  {
    name: "SHAIKH MOHAMMAD MONIRUZZAMAN BAPPI",
    destination: "Belgium",
    flag: "🇧🇪",
    createdOn: "16–04–2025 10:09 AM",
    createdBy: "Mr. Tasbirul Islam Shobuj (Partner)",
    assignedTo: "Poonam Zoting",
    contact: "8956780216",
    country: "Bangladesh",
    education: "Undergraduate",
    studyLevel: "Postgraduate",
    studyArea: "Commerce, Business and Administration",
    additionalInfo: "The candidate will soon appear for IELTS exam. Expected 6.5",
    documentCount: 1,
  },
  {
    name: "MD Imran Hossain",
    destination: "Italy",
    flag: "🇮🇹",
    createdOn: "15–04–2025 03:44 PM",
    createdBy: "Mr. Tasbirul Islam Shobuj (Partner)",
  },
];

const EnquiriesRequestedPanel = () => {
  const [selected, setSelected] = useState(programList[0]);

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4 max-w-full overflow-x-hidden">
      {/* Left Panel */}
      <div className="lg:w-1/2 w-full">
        {programList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className={`border rounded-md p-4 mb-3 cursor-pointer ${
              selected.name === item.name
                ? "bg-green-50 border-blue-500"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center flex-wrap gap-2">
              <p className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold">
                Program Options Sent
              </p>
            </div>
            <h3 className="text-sm font-bold mt-2">{item.name}</h3>
            <p className="text-sm mt-1 text-gray-700">
              Preferred Destination: <span className="inline-flex items-center gap-1">{item.flag} {item.destination}</span>
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Created On:</span> {item.createdOn}
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Created By:</span> {item.createdBy}
            </p>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
          <p className="text-sm text-gray-500">Showing 1 – 2</p>
          <div className="flex items-center gap-2">
            <label htmlFor="perPage" className="text-sm text-gray-700">Show</label>
            <select id="perPage" className="border rounded px-2 py-1 text-sm">
              <option>10</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {selected && (
        <div className="lg:w-1/2 w-full bg-white p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
            <h3 className="font-bold text-lg max-w-sm leading-tight">
              {selected.name}
            </h3>
            <div className="flex flex-col items-end">
              <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded font-semibold mb-1">
                Program Options Sent
              </span>
              <p className="text-xs text-gray-500">Created On: {selected.createdOn}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <p><span className="font-semibold">Assigned To:</span> <span className="text-blue-600 font-medium">{selected.assignedTo}</span> — {selected.contact}</p>
            <p><span className="font-semibold">Country Of Education:</span> {selected.country}</p>
            <p><span className="font-semibold">Highest Education Level:</span> {selected.education}</p>
            <p><span className="font-semibold">Preferred Destination:</span> <span className="inline-flex items-center gap-1">{selected.flag} {selected.destination}</span></p>
            <p><span className="font-semibold">Preferred Study Level:</span> {selected.studyLevel}</p>
            <p><span className="font-semibold">Preferred Study Area:</span> {selected.studyArea}</p>
            <p className="md:col-span-2"><span className="font-semibold">Additional Information:</span> {selected.additionalInfo}</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="font-semibold">Documents:</p>
              <button className="text-blue-600 border border-blue-600 px-3 py-1 text-sm rounded">View ({selected.documentCount})</button>
              <button className="text-blue-600 border border-blue-600 px-3 py-1 text-sm rounded">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiriesRequestedPanel;
