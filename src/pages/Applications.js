import React, { useState, useEffect } from 'react'
import response from '../utils/demo/tableData'
import ApplicationsTable from '../components/Applications/ApplicationsTable'

function Applications() {
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

  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}
      <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Title and Subtitle */}
        <div>
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Applications</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your Students’ Applications.</p>
        </div>

        {/* Right: Buttons */}
        <div className="">
          {/* Request Program Options */}
          {/* <button className="flex items-center sm:flex-row gap-3 px-4 py-2 bg-white text-brandRed border-2 border-brandRed rounded-md text-sm md:text-base transition">
            <span>Export Application Data </span>
            <TbDownload />
          </button> */}
          
        </div>
      </div>
    </div>
      {/* <CTA /> */}

    {/* <ApplicationsFilterPanel/> */}
      <ApplicationsTable/>
    </>
  )
}

export default Applications
