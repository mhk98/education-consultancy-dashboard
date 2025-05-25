import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const Invoice = ({ invoiceData }) => {
  const invoiceRef = useRef();

  const downloadInvoice = () => {
    const opt = {
      margin: 0.5,
      filename: `invoice-${invoiceData.invoiceNo}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Clone the node and render hidden
    const clone = invoiceRef.current.cloneNode(true);
    clone.style.display = 'block';
    document.body.appendChild(clone);

    html2pdf().set(opt).from(clone).save().then(() => {
      document.body.removeChild(clone); // Clean up
    });
  };

  return (
    <>
      <button
        onClick={downloadInvoice}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        Download Invoice
      </button>

      <div ref={invoiceRef} className="hidden">
        {/* Your actual invoice layout below */}
        <div className="p-6 max-w-3xl bg-white rounded shadow text-black">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-gray-500">Invoice No: {invoiceData.invoiceNo}</p>
            <p className="text-gray-500">Date: {invoiceData.date}</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-1">Issued To:</h2>
            <p>Student ID: {invoiceData.studentId}</p>
            <p>Name: {invoiceData.name}</p>
            <p>Phone: {invoiceData.phone}</p>
            <p>Address: {invoiceData.address}</p>
          </div>

          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">QTY</th>
                <th className="p-2 border">PURPOSE</th>
                <th className="p-2 border">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border">{item.qty}</td>
                  <td className="p-2 border">{item.purpose}</td>
                  <td className="p-2 border">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mb-4">
            <p>Sub total: {invoiceData.subTotal}</p>
            <p>Discount: {invoiceData.discount}</p>
            <p>Taxes: {invoiceData.taxes}</p>
            <p className="font-bold">TOTAL: {invoiceData.total}</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p>Branch: {invoiceData.branch}</p>
              <p>Transaction ID: {invoiceData.transactionId}</p>
              <p>Payment Method: {invoiceData.paymentMethod}</p>
            </div>
            <div className="text-center">
              <p className="mt-8 border-t border-gray-400 pt-2">Signature</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
