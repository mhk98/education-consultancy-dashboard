

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilterPanel = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    intake: '',
    year: '',
    country: '',
    branch: '',
  });

  const [statusCounts, setStatusCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on filters change
  useEffect(() => {
    const fetchStatusCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Filter out empty values to avoid sending unnecessary params
        const params = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        );

        const response = await axios.get('http://localhost:5000/api/v1/application/status', { params });

        setStatusCounts(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch application counts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusCounts();
  }, [filters]);

  // Handle input/select changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'border-green-500';
      case 'pending':
        return 'border-yellow-500';
      case 'rejected':
        return 'border-red-500';
      case 'in review':
        return 'border-blue-500';
      default:
        return 'border-gray-400';
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Application Filters</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block mb-1 font-medium">
            From Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full border rounded p-2"
            max={filters.endDate || undefined} // optional: can't pick startDate after endDate
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block mb-1 font-medium">
            To Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full border rounded p-2"
            min={filters.startDate || undefined} // optional: can't pick endDate before startDate
          />
        </div>

        {/* Intake */}
        <div>
          <label htmlFor="intake" className="block mb-1 font-medium">
            Intake
          </label>
          <select
            id="intake"
            name="intake"
            value={filters.intake}
            onChange={handleFilterChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Intake</option>
            <option value="Jan/Feb">Jan/Feb</option>
            <option value="June/July">June/July</option>
            <option value="Sep/Oct">Sep/Oct</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block mb-1 font-medium">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Year</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block mb-1 font-medium">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Country</option>
            <option value="England">England</option>
            <option value="Finland">Finland</option>
            <option value="German">German</option>
          </select>
        </div>

        {/* Branch */}
        <div>
          <label htmlFor="branch" className="block mb-1 font-medium">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            value={filters.branch}
            onChange={handleFilterChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Branch</option>
            <option value="Khulna">Khulna</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Tangail">Tangail</option>
            <option value="Jashore">Jashore</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Savar">Savar</option>
            <option value="Feni">Feni</option>
          </select>
        </div>
      </div>

      {/* Display status counts */}
      <div>
        {loading && <p>Loading data...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && statusCounts.length === 0 && (
          <p>No applications found with current filters.</p>
        )}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-8">
{statusCounts.map(({ status, count }) => (
  <div
    key={status}
    className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${getStatusColor(status)}`}
  >
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-sm font-medium text-gray-800 capitalize">{status}</h4>
    </div>
    <div className="text-2xl font-semibold text-gray-800">{count}</div>
  </div>
))}

    </div>
      </div>
    </div>
  );
};

export default FilterPanel;
