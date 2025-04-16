import React, { useState, useEffect } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import FilterPanel from '../components/FilterPanel'
import DashboardCards from '../components/DashboardCards'
import DashboardItems from '../components/DashboardItems'
import StudentQRCard from '../components/StudentQRCard'
import QuickLinks from '../components/QuickLinks'
import RegionalManagers from '../components/RegionalManagers'

function Students() {
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
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Students</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your Students and their Profiles</p>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Request Program Options */}
          <button className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-md text-sm md:text-base transition">
            Archived Students
          </button>

          {/* Register New Student */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm md:text-base hover:bg-blue-700 transition">
            + Register New Student
          </button>
        </div>
      </div>
    </div>
      {/* <CTA /> */}

    <FilterPanel/>
        <DashboardCards/>
      <DashboardItems/>
      <StudentQRCard/>
      <QuickLinks/>
      <RegionalManagers/>
    </>
  )
}

export default Students
