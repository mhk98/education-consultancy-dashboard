import React, { useState } from 'react';
import Select from 'react-select';
import { Input, Label } from '@windmill/react-ui';

const UserManagementFilter = () => {
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
        


   

        {/* First No. */}
        <Label>
          <span>First Name</span>
          <Input className="mt-1" type="text" placeholder="First Name" />
        </Label>

        {/* Last Name */}
        <Label>
          <span>Last Name</span>
          <Input className="mt-1" type="text" placeholder="Last Name" />
        </Label>

        {/* Email */}
        <Label>
          <span>Email</span>
          <Input className="mt-1" type="text" placeholder="Email" />
        </Label>

        <Label>
          <span>Email</span>
          <Input className="mt-1" type="text" placeholder="Email" />
        </Label>
        <div>
        <button className="w-full md:w-auto border mt-6 border-purple-500 text-purple-600 font-medium rounded-md px-4 py-2 hover:bg-blue-50 transition">
            Search
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default UserManagementFilter;
