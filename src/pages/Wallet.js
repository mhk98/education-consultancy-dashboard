import React, { useState } from 'react'

import { TbCurrencyTaka } from 'react-icons/tb'
import WalletFilter from '../components/Wallet/WalletFilter'
import Amount from '../components/Wallet/Amount';
import CashIn from '../components/Wallet/CashIn';
import CashOut from '../components/Wallet/CashOut';


function Wallet() {
 
const id = localStorage.getItem("userId")
   const [activeTab, setActiveTab] = useState("amount");
    
      const isamount = activeTab === "amount";
      const iscashIn = activeTab === "cashIn";
      const iscashOut = activeTab === "cashOut";

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
          <button className="px-4 py-2 flex items-center bg-white text-brandRed border-2 border-brandRed rounded-md text-sm md:text-base transition">
          <TbCurrencyTaka /> 0
          </button>

          {/* Register New Student */}
          {/* <button className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
            ADD MONEY
          </button> */}
        </div>
      </div>
    </div>
      {/* <CTA /> */}

    <WalletFilter/>
      {/* <WalletTable/> */}
      <div className="p-4 md:p-8 w-full mx-auto">
        {/* Navigation Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          <div onClick={() => setActiveTab("amount")} className={`flex flex-col items-center cursor-pointer ${isamount ? "bg-brandRed text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            <h1  className="mt-1 text-xl">Amount</h1>
          </div>
          <div  onClick={() => setActiveTab("cashIn")}
          className={`flex flex-col items-center cursor-pointer ${iscashIn ? "bg-brandRed text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            {/* className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
      isFinance ? "bg-brandRed text-white" : "bg-gray-200"
    }`} */}
            <h1 className="mt-1 text-xl">Cash In</h1>

          </div>

          {/* <div 
              onClick={() => setActiveTab("work")}  className="flex flex-col items-center cursor-pointer">
            <span className="mt-1 text-sm text-gray-700">Work Experience</span>
          </div> */}
          <div 
              onClick={() => setActiveTab("cashOut")}  className={`flex flex-col items-center cursor-pointer ${iscashOut ? "bg-brandRed text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            <h1 className="mt-1 text-xl">Cash Out</h1>

          </div>
        </div>



         {/* Separated Content Section Below */}
              <div className="mt-4 p-4 bg-white rounded-md">
              {isamount ? (
                <div>

                <Amount id = {id}/>

                </div>
              ): iscashIn ?  (
                <div>

                 <CashIn id={id}/>

                </div>
              )  : (

                <CashOut id={id}/>

              )
            
            }
            </div>
    </div>
    </>
  )
}

export default Wallet;
