import React, { useState, useEffect } from 'react'
import response from '../utils/demo/tableData'
import FilterPanel from '../components/FilterPanel'
import StudentTable from '../components/Students/StudentTable'
import StudentFilter from '../components/Students/StudentFilter'
import EnquiriesRequestedFilter from '../components/Enquiries/EnquiriesRequestedFilter'
import EnquiriesArchivedFilter from '../components/Enquiries/EnquiriesArchivedFilter'
import EnquiriesRequestedPanel from '../components/Enquiries/EnquiriesRequestedPanel'

function Enquiries() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

const [activeTab, setActiveTab] = useState("requested");

  const isRequested = activeTab === "requested";

  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}
      <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Title and Subtitle */}
        <div>
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Enquiries</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your student’s enquiries.</p>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Request Program Options */}

          {/* Register New Student */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm md:text-base hover:bg-blue-700 transition">
            + Request Program Options from KC Team
          </button>
        </div>
      </div>

      <div className="w-full sm:w-auto">
          <div className="flex gap-4 text-sm font-medium mb-1">
            <span
              className={`cursor-pointer pb-1 ${
                isRequested
                  ? "text-blue-600 "
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("requested")}
            >
              Requested
            </span>
            <span
              className={`cursor-pointer pb-1 ${
                !isRequested
                  ? "text-blue-600 "
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("paid")}
            >
              Archived
            </span>
          </div>

          <div className="h-1 bg-blue-100 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: isRequested ? "10%" : "20%" }}
            ></div>
          </div>
        </div>

        {/* Separated Content Section Below */}
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
        {isRequested ? (
          <div>
           <EnquiriesRequestedFilter/>
           <EnquiriesRequestedPanel/>
          </div>
        ) : (
          <div>
            <EnquiriesArchivedFilter/>


          </div>
        )}
      </div>
    </div>
   
    </>
  )
}

export default Enquiries
