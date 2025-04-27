import React, { useState } from 'react';
import Select from 'react-select';

const FilterPanel = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedIntakes, setSelectedIntakes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const intakeOptions = [
    { value: 'january', label: 'January' },
    { value: 'may', label: 'May' },
    { value: 'september', label: 'September' },
  ];

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
  ];

  const countryOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        
        {/* From Date */}
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded p-1 text-black bg-white"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded p-1 text-black bg-white"
          />
        </div>

        {/* Intake */}
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Intake</label>
          <Select
            isMulti
            options={intakeOptions}
            onChange={(selectedOptions) =>
              setSelectedIntakes(selectedOptions.map(option => option.value))
            }
            className="text-sm"
            placeholder="Select Intake"
          />
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Year</label>
          <Select
            isMulti
            options={yearOptions}
            onChange={(selectedOptions) =>
              setSelectedYears(selectedOptions.map(option => option.value))
            }
            className="text-sm"
            placeholder="Select Year"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Country</label>
          <Select
            isMulti
            options={countryOptions}
            onChange={(selectedOptions) =>
              setSelectedCountries(selectedOptions.map(option => option.value))
            }
            className="text-sm"
            placeholder="Select Countries"
          />
        </div>

        {/* Apply Button */}
        <div className="lg:col-span-5 text-left">
          <button className="w-full md:w-auto border border-blue-500 text-blue-600 font-medium rounded-md px-4 py-2 hover:bg-blue-50 transition">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
