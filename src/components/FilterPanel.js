import React, { useState } from 'react';
import Select from 'react-select';

const FilterPanel = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedIntakes, setSelectedIntakes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  console.log("selectedIntakes", selectedIntakes)
  console.log("selectedYears", selectedYears)
  console.log("selectedCountries", selectedCountries)

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

        {/* Date From */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-black">From:</label>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded p-1 text-black bg-white"
          />
        </div>

        {/* Date To */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-black">To:</label>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded p-1 text-black bg-white"
          />
        </div>

        {/* Select Intake (multi + searchable) */}
        {/* <Select
          isMulti
          options={intakeOptions}
          value={selectedIntakes}
          onChange={setSelectedIntakes}
          className="text-sm"
          placeholder="Select Intake"
        /> */}

        <Select
        isMulti
        options={intakeOptions}
        onChange={(selectedOptions) => {
            const values = selectedOptions.map(option => option.value);
            setSelectedIntakes(values);
            console.log("selectedIntakes", values); // <- will show ['january', 'may']
        }}
        className="text-sm"
        placeholder="Select Intake"
        />
        <Select
        isMulti
        options={yearOptions}
        onChange={(selectedOptions) => {
            const values = selectedOptions.map(option => option.value);
            setSelectedYears(values);
            console.log("selectedYears", values); // <- will show ['january', 'may']
        }}
        className="text-sm"
        placeholder="Select Years"
        />


        {/* Select Year (multi + searchable)
        <Select
          isMulti
          options={yearOptions}
          value={selectedYears}
          onChange={setSelectedYears}
          className="text-sm"
          placeholder="Select Year"
        /> */}

        {/* Select Country (multi + searchable) */}
        {/* <Select
          isMulti
          options={countryOptions}
          value={selectedCountries}
          onChange={setSelectedCountries}
          className="text-sm"
          placeholder="Select Countries"
        /> */}

        <Select
        isMulti
        options={countryOptions}
        onChange={(selectedOptions) => {
            const values = selectedOptions.map(option => option.value);
            setSelectedCountries(values);
            // console.log("selectedCountries", values); // <- will show ['january', 'may']
        }}
        className="text-sm"
        placeholder="Select Countries"
        />

        {/* Apply Filter Button */}
        <button className="w-full border border-blue-500 text-blue-600 font-medium rounded-md px-4 py-2 hover:bg-blue-50 transition">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
