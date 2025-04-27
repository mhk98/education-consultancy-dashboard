import React, { useState } from 'react';
import Select from 'react-select';
import { Input, Label } from '@windmill/react-ui';

const ApplicationsFilterPanel = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedIntakes, setSelectedIntakes] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

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

  const universityOptions = [
    { value: 'harvard', label: 'Harvard' },
    { value: 'toronto', label: 'University of Toronto' },
    { value: 'sydney', label: 'University of Sydney' },
  ];

  const statusOptions = [
    { value: 'app_incomplete', label: 'App. Incomplete' },
    { value: 'app_submitted', label: 'App. Submitted' },
    { value: 'offer_received', label: 'Offer Received' },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        
        {/* Date From */}
        <Label>
          <span>From</span>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1"
          />
        </Label>

        {/* Date To */}
        <Label>
          <span>To</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1"
          />
        </Label>

        {/* Country */}
        <Label>
          <span>Country</span>
          <Select
            isMulti
            options={countryOptions}
            onChange={(opts) => setSelectedCountries(opts.map(o => o.value))}
            className="text-sm"
            placeholder="Select Country"
          />
        </Label>

        {/* University */}
        <Label>
          <span>University</span>
          <Select
            isMulti
            options={universityOptions}
            onChange={(opts) => setSelectedUniversities(opts.map(o => o.value))}
            className="text-sm"
            placeholder="Select University"
          />
        </Label>

        {/* Intake */}
        <Label>
          <span>Intake</span>
          <Select
            isMulti
            options={intakeOptions}
            onChange={(opts) => setSelectedIntakes(opts.map(o => o.value))}
            className="text-sm"
            placeholder="Select Intake"
          />
        </Label>

        {/* Year */}
        <Label>
          <span>Year</span>
          <Select
            isMulti
            options={yearOptions}
            onChange={(opts) => setSelectedYears(opts.map(o => o.value))}
            className="text-sm"
            placeholder="Select Year"
          />
        </Label>

        {/* Status */}
        <Label>
          <span>Status</span>
          <Select
            isMulti
            options={statusOptions}
            onChange={(opts) => setSelectedStatuses(opts.map(o => o.value))}
            className="text-sm"
            placeholder="Select Status"
          />
        </Label>

        {/* Ack No. */}
        <Label>
          <span>Acknowledgement No.</span>
          <Input className="mt-1" type="text" placeholder="Ack No." />
        </Label>

        {/* Program Name */}
        <Label>
          <span>Program Name</span>
          <Input className="mt-1" type="text" placeholder="Program Name" />
        </Label>

        {/* Student Name */}
        <Label>
          <span>Student Name</span>
          <Input className="mt-1" type="text" placeholder="Student Name" />
        </Label>

        {/* Search Button */}
        <div className="col-span-1 md:col-span-2 lg:col-span-5 text-left">
          <button className="w-full md:w-auto border border-blue-500 text-blue-600 font-medium rounded-md px-4 py-2 hover:bg-blue-50 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsFilterPanel;
