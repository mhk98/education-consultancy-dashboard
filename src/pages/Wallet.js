import React, { useEffect, useState } from 'react'

import { TbCurrencyTaka } from 'react-icons/tb'
import Amount from '../components/Wallet/Amount';
import CashIn from '../components/Wallet/CashIn';
import CashOut from '../components/Wallet/CashOut';
import { useGetAllPendingPaymentQuery } from '../features/pendingPayment/pendingPayment';
import SuperAdminStatement from '../components/Wallet/SuperAdminStatement';


function Wallet() {
 
const id = localStorage.getItem("userId")
const role = localStorage.getItem("role")
const branch = localStorage.getItem("branch")
   const [activeTab, setActiveTab] = useState("amount");
    
      const iseduAnchor = activeTab === "eduAnchor";
      const isamount = activeTab === "amount";
      const iscashIn = activeTab === "cashIn";
      const iscashOut = activeTab === "cashOut";

      const { data, isLoading, isError, error } = useGetAllPendingPaymentQuery();
      // const [creditPayments, setCreditPayments] = useState([]);
      const [totalAmount, setTotalAmount] = useState(0);
      
      useEffect(() => {
        if (isError) {
          console.log("Error fetching", error);
        } else if (!isLoading && data) {
          const allCreditPayments = data.data;
      
          // ✅ Filter payments with any of the 3 paymentStatus values
          const filtered = allCreditPayments.filter(payment =>
            ["Cash-In", "Offline", "Online"].includes(payment.paymentStatus) && payment.status === "PAID"
          );
      
          // setCreditPayments(filtered);
      
          // ✅ Sum amounts
          const total = filtered.reduce((sum, payment) => {
            return sum + Number(payment.amount || 0);
          }, 0);
      
          setTotalAmount(total);
        }
      }, [data, isLoading, isError, error]);


      const { data:data1, isLoading:isLoading1, isError:isError1, error:error1 } = useGetAllPendingPaymentQuery();
      // const [creditPayments, setCreditPayments] = useState([]);
      const [totalDebitAmount, setTotalDebitAmount] = useState(0);
      
      useEffect(() => {
        if (isError1) {
          console.log("Error fetching", error1);
        } else if (!isLoading1 && data1) {
          const allCreditPayments = data1.data;
      
          // ✅ Filter payments with any of the 3 paymentStatus values
          const filtered = allCreditPayments.filter(payment =>
            ["Cash-Out",].includes(payment.paymentStatus) && payment.status === "PAID" 
          );
      
          // setCreditPayments(filtered);
      
          // ✅ Sum amounts
          const total = filtered.reduce((sum, payment) => {
            return sum + Number(payment.amount || 0);
          }, 0);
      
          setTotalDebitAmount(total);
        }
      }, [data1, isLoading1, isError1, error1]);


      const balance = totalAmount - totalDebitAmount;

      console.log("balance", balance)



      const { data:data2, isLoading:isLoading2, isError:isError2, error:error2 } = useGetAllPendingPaymentQuery();
      // const [creditPayments, setCreditPayments] = useState([]);
      const [totalBranchAmount, setTotalBranchAmount] = useState(0);
      
      useEffect(() => {
        if (isError2) {
          console.log("Error fetching", error2);
        } else if (!isLoading2 && data2) {
          const allCreditPayments = data2.data;
      
          // ✅ Filter payments with any of the 3 paymentStatus values
          const filtered = allCreditPayments.filter(payment =>
            ["Cash-In", "Offline", "Online"].includes(payment.paymentStatus) && payment.status === "PAID" && payment.branch === branch
          );
      
          // setCreditPayments(filtered);
      
          // ✅ Sum amounts
          const total = filtered.reduce((sum, payment) => {
            return sum + Number(payment.amount || 0);
          }, 0);
      
          setTotalBranchAmount(total);
        }
      }, [data2, isLoading2, isError2, error2, branch]);


      const { data:data3, isLoading:isLoading3, isError:isError3, error:error3 } = useGetAllPendingPaymentQuery();
      // const [creditPayments, setCreditPayments] = useState([]);
      const [totalBranchDebitAmount, setTotalBranchDebitAmount] = useState(0);
      
      useEffect(() => {
        if (isError3) {
          console.log("Error fetching", error3);
        } else if (!isLoading3 && data3) {
          const allCreditPayments = data3.data;
      
          // ✅ Filter payments with any of the 3 paymentStatus values
          const filtered = allCreditPayments.filter(payment =>
            ["Cash-Out",].includes(payment.paymentStatus) && payment.status === "PAID" && payment.branch === branch
          );
      
          // setCreditPayments(filtered);
      
          // ✅ Sum amounts
          const total = filtered.reduce((sum, payment) => {
            return sum + Number(payment.amount || 0);
          }, 0);
      
          setTotalBranchDebitAmount(total);
        }
      }, [data3, isLoading3, isError3, error3, branch]);


      const branchBalance = totalBranchAmount - totalBranchDebitAmount;

      console.log("balance", balance)

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
        {
          role === "superAdmin" ? (
            <div className="flex items-center sm:flex-row gap-3">
          <p>Balance:</p>
          <button className="px-4 py-2 flex items-center bg-white text-brandRed border-2 border-brandRed rounded-md text-sm md:text-base transition">
          <TbCurrencyTaka /> {balance}
          </button>

          {/* Register New Student */}
          {/* <button className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
            ADD MONEY
          </button> */}
        </div>
          ) : (
            <div className="flex items-center sm:flex-row gap-3">
          <p>Balance:</p>
          <button className="px-4 py-2 flex items-center bg-white text-brandRed border-2 border-brandRed rounded-md text-sm md:text-base transition">
          <TbCurrencyTaka /> {branchBalance}
          </button>

          {/* Register New Student */}
          {/* <button className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
            ADD MONEY
          </button> */}
        </div>
          )
        }
      </div>
    </div>
      {/* <CTA /> */}

      {/* <WalletTable/> */}
      <div className="p-4 md:p-8 w-full mx-auto">
        {/* Navigation Steps */}
        
        {
          role === "superAdmin" ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div onClick={() => setActiveTab("eduAnchor")} className={`flex flex-col items-center cursor-pointer ${iseduAnchor ? "bg-brandRed text-white rounded-md py-1" : "bg-gray-200 text-gray-700 rounded-md py-1"}`}>
            <h1  className="mt-1 text-xl">EduAnchor</h1>
          </div>

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
          ) : (
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
          )
        }



         {/* Separated Content Section Below */}
              {
                role === "superAdmin" ? (
                  <div className="mt-4 p-4 bg-white rounded-md">
              {
              iseduAnchor ? (
                <div>

                <SuperAdminStatement id = {id}/>

                </div>
              ) :
              isamount ? (
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
                ) : (
                  <div className="mt-4 p-4 bg-white rounded-md">
              {
              
              isamount ? (
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
                )
              }
    </div>
    </>
  )
}

export default Wallet;
