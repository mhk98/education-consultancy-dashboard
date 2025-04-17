import React, { useState, useEffect } from 'react'
import response from '../utils/demo/tableData'
import FilterPanel from '../components/FilterPanel'
import StudentTable from '../components/Students/StudentTable'
import { TbCurrencyTaka } from 'react-icons/tb'
import WalletFilter from '../components/Wallet/WalletFilter'
import WalletTable from '../components/Wallet/WalletTable'

function Wallet() {
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
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">My Wallet</h4>
          {/* <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your Students and their Profiles</p> */}
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center sm:flex-row gap-3">
          <p>Balance:</p>
          <button className="px-4 py-2 flex items-center bg-white text-blue-600 border-2 border-blue-600 rounded-md text-sm md:text-base transition">
          <TbCurrencyTaka /> 0
          </button>

          {/* Register New Student */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm md:text-base hover:bg-blue-700 transition">
            ADD MONEY
          </button>
        </div>
      </div>
    </div>
      {/* <CTA /> */}

    <WalletFilter/>
      <WalletTable/>
    </>
  )
}

export default Wallet;
