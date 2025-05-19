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

function Dashboard() {
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
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Dashboard</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Welcome to EduAnchor Portal</p>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Flywire Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-brandRed text-brandRed rounded-md hover:bg-brandRed-50 transition">
            <span className="text-sm md:text-base">Pay Fees via</span>
            {/* <img
              src="https://cdn.flywire.com/assets/images/logos/flywire/flywire-logo-brandRed.svg"
              alt="Flywire"
              className="h-5"
            /> */}
          </button>

          {/* Request Program Options */}
          <button className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
            + Request Program Options from EduAnchor Team
          </button>

          {/* Register New Student */}
          <button className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
            + Register New Student
          </button>
        </div>
      </div>
    </div>
      {/* <CTA /> */}

    <FilterPanel/>
      {/* <!-- Cards --> */}
      {/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-brandRed dark:text-brandRed-100"
            bgColorClass="bg-brandRed-100 dark:bg-brandRed"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div> */}

        <DashboardCards/>
      {/* <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer> */}

      <DashboardItems/>
      <StudentQRCard/>
      <QuickLinks/>
      <RegionalManagers/>
    </>
  )
}

export default Dashboard
