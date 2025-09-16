import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import {
  useCreateConsultationMutation,
  useDeleteConsultationMutation,
  useGetAllConsultationQuery,
  useUpdateConsultationMutation,
} from "../features/consultation/consultation";
import toast from "react-hot-toast";
import { LiaEditSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineGridView } from "react-icons/md";
import axios from "axios";
import { Input, Label } from "@windmill/react-ui";

function Leads() {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-06-23"
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    fullName: "",
    phone: "",
    ieltsScore: "",
    destination: "",
    location: "",
    // month: '',
    startDate: "",
    endDate: "",
    selectedStatus: "",
  });

  console.log("filters", filters.fullName);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const [leadId, setLeadId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [todayCallDate, setTodayCallDate] = useState("");
  const [successCase, setSuccessCase] = useState("");
  const [myCase, setMyCase] = useState("");

  useEffect(() => {
    if (selectedType === today) {
      setTodayCallDate(selectedType);
    } else {
      setTodayCallDate("");
    }
  }, [selectedType, today]);

  useEffect(() => {
    if (selectedType === "Success Case") {
      setSuccessCase(selectedType);
    } else {
      setSuccessCase("");
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedType === "My Case") {
      setMyCase(selectedType);
    } else {
      setMyCase("");
    }
  }, [selectedType]);

  console.log("selectedType", selectedType);
  console.log("todayCallDate", todayCallDate);

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setValueEdit,
    formState: { errors: errorsEdit },
  } = useForm();

  // const Params =
  // todayCallDate ? { appointmentDate: todayCallDate }
  //   : successCase ? {type: successCase, user_id:id}
  //   : myCase ? {user_id:id}
  //   :
  //   filters.startDate && filters.endDate ? {
  //       type: "Success Case",
  //       user_id: id,
  //       startDate: filters.startDate,
  //       endDate: filters.endDate
  //     }
  //   : {
  //       type: selectedType,
  //       fullName: filters.fullName,
  //       phone: filters.phone,
  //       ieltsScore: filters.ieltsScore,
  //       destination: filters.destination,
  //     };

  const Params = todayCallDate
    ? { appointmentDate: todayCallDate }
    : successCase
    ? { type: successCase, user_id: id }
    : myCase
    ? { user_id: id }
    : filters.startDate && filters.endDate
    ? {
        type: "Success Case",
        user_id: id,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }
    : {
        type: selectedType,
        fullName: filters.fullName,
        phone: filters.phone,
        ieltsScore: filters.ieltsScore,
        destination: filters.destination,
      };

  //   const queryParams =
  // role === "superAdmin"
  //   ? {
  //       ...Params,
  //       location: filters.location,
  //       status:selectedStatus,
  //       page: currentPage,
  //       limit: itemsPerPage,
  //     }
  //   : role === "admin"
  //   ? {
  //       ...Params,
  //       location: branch,
  //       status:selectedStatus,
  //       page: currentPage,
  //       limit: itemsPerPage,

  //     } : role === "employee" ? {
  //       ...Params,
  //       location: branch,
  //       status: selectedStatus,
  //       page: currentPage,
  //       limit: itemsPerPage,
  //     }
  //   : null;

  const queryParams =
    role === "superAdmin"
      ? {
          ...Params,
          location: filters.location,
          status: selectedStatus,
          page: currentPage,
          limit: itemsPerPage,
          role, // pass role
        }
      : role === "admin"
      ? {
          ...Params,
          location: branch,
          status: selectedStatus,
          page: currentPage,
          limit: itemsPerPage,
          role, // pass role
        }
      : role === "employee"
      ? {
          ...Params,
          location: branch,
          status: selectedStatus,
          page: currentPage,
          limit: itemsPerPage,
          role,
          user_id: id, // ✅ this is needed for backend access control
        }
      : null;

  const { data, isLoading, isError, error } =
    useGetAllConsultationQuery(queryParams);

  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching consultations:", error);
    } else if (!isLoading && data?.data) {
      setConsultations(data.data);
    }
  }, [data, isLoading, isError, error]);

  // Form submit handlers for create & update
  const [createConsultation] = useCreateConsultationMutation();
  const [updateConsultation] = useUpdateConsultationMutation();
  const [deleteConsultation] = useDeleteConsultationMutation();

  const onFormSubmit = async (formData) => {
    const dataExtended = { ...formData, type: "Office Visits" };
    const res = await createConsultation(dataExtended);

    if (res?.data?.success) {
      toast.success("Form submitted successfully");
      resetAdd();
      setIsModalOpen(false);
    } else {
      toast.error("Something went wrong");
    }
  };

  const onFormEdit = async (data) => {
    console.log("Submitting Update:", { id: leadId, data });

    try {
      const res = await updateConsultation({ id: leadId, data }).unwrap(); // .unwrap() throws error on failure
      console.log("Update Success:", res);

      if (res.success) {
        toast.success(res.message || "Updated successfully");
        resetEdit();
        setIsModalOpen1(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err?.data?.message || "Failed to update");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await deleteConsultation(id);
      if (res?.data?.success) {
        toast.success(res.data.message);
        // Optionally refetch or update consultations state here
        setConsultations((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(res.error?.data?.message || "Failed. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
  };

  // Fetch users for assignedTo select inputs
  const [admins, setAdmins] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.eaconsultancy.info/api/v1/user/student"
        );
        const allUsers = response.data.data;
        const filteredAdmins = allUsers.filter(
          (user) =>
            user.Role?.toLowerCase() !== "student" &&
            ((user.Role?.toLowerCase() === "admin" && user.Branch === branch) ||
              (user.Role?.toLowerCase() === "employee" &&
                user.Branch === branch))
        );
        setEmployees(
          allUsers.filter(
            (user) =>
              user.Role?.toLowerCase() === "employee" &&
              user.id === id &&
              user.Branch === branch
          )
        );
        setAdmins(filteredAdmins);
        setSuperAdmins(
          allUsers.filter((user) => user.Role?.toLowerCase() !== "student")
        );
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [branch, id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      fullName: "",
      phone: "",
      ieltsScore: "",
      destination: "",
      location: "",
      // month: '',
      startDate: "",
      endDate: "",
      selectedStatus: "",
    });
  };

  console.log("filters", filters);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="w-full px-4 py-6 bg-gray-50 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h4 className="text-xl md:text-2xl font-semibold text-gray-900">
          Lead Management
        </h4>
        <div className="w-full sm:w-auto">
          <button
            onClick={() => {
              setIsModalOpen(true);
              resetAdd(); // Reset form when opening create modal
            }}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-md text-sm sm:text-base"
          >
            + Add Lead
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        {/* Date Filters */}

        {/* Name */}
        <Label>
          <span>Name</span>
          <Input
            id="fullName"
            name="fullName"
            value={filters.fullName}
            onChange={handleFilterChange}
            className="mt-1"
            placeholder="Name"
          />
        </Label>

        {/* Name */}
        <Label>
          <span>Phone</span>
          <Input
            id="phone"
            name="phone"
            value={filters.phone}
            onChange={handleFilterChange}
            className="mt-1"
            placeholder="Phone"
          />
        </Label>

        <Label>
          <span>IELTS Score</span>
          <Input
            id="ieltsScore"
            name="ieltsScore"
            value={filters.ieltsScore}
            onChange={handleFilterChange}
            className="mt-1"
            placeholder="ieltsScore"
          />
        </Label>

        <Label>
          <span>Prefd Destination</span>
          <Input
            id="destination"
            name="destination"
            value={filters.destination}
            onChange={handleFilterChange}
            className="mt-1"
            placeholder="destination"
          />
        </Label>

        {/* Branch */}
        {role === "superAdmin" && (
          <div>
            <label htmlFor="Branch" className="block mb-1 font-medium">
              Branch
            </label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Branch</option>
              <option value="Edu Anchor">Edu Anchor</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Khulna">Khulna</option>
              <option value="Satkhira">Satkhira</option>
              <option value="Jashore">Jashore</option>
              <option value="Feni">Feni</option>
              <option value="Nord Edu">Nord Edu</option>
            </select>
          </div>
        )}

        <div className="flex items-end gap-2">
          <Button
            className="w-full bg-brandRed text-white"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        {/* Status Dropdown */}
        <div>
          <label
            htmlFor="type"
            className="block mb-1 font-medium text-gray-700"
          >
            Lead Type
          </label>
          <select
            id="type"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">All Leads</option>
            <option value="Website Leads">Meta Leads / Website Leads</option>
            <option value="Office Visits">Office Visits</option>
            <option value="My Case">My Case</option>
            <option value="Success Case">Previous Success Case</option>
            <option value={today}>Today Call List</option>
          </select>
        </div>

        {/* <Label className="w-full">
  <span>Month</span>
  <input
    type="month"
    name="month"
    id="month"
    value={filters.month}
    onChange={handleFilterChange}
    className="w-full border rounded px-3 py-2 mt-1"
  />
</Label> */}
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
            max={filters.endDate || undefined}
          />
        </div>
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
            min={filters.startDate || undefined}
          />
        </div>

        <div className="flex items-end gap-2">
          <Button
            className="w-full bg-brandRed text-white"
            onClick={() => {
              setSelectedType("");
              setTodayCallDate("");
              clearFilters(); // ✅ handles all filters including month
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {/* Total Counts */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-900">
            Total Counts: {consultations.length}
          </h4>
        </div>
        <div>
          <select
            id="status"
            onChange={(e) => setSelectedStatus(e.target.value)}
            value={selectedType}
            className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Lead Status</option>
            <option value="Hot Lead">Hot Lead</option>
            <option value="Cool Lead">Cool Lead</option>
          </select>
        </div>
      </div>

      {filters.startDate &&
        filters.endDate &&
        Params?.type === "Success Case" &&
        consultations.length > 0 && (
          <div className="alert alert-success my-8">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-lg text-green-800">
                🎉 Congratulations!!
              </span>
              <span className="text-gray-700">
                This month you have completed{" "}
                <strong>{consultations.length}</strong> Success Cases. Total
                Amount: <strong>{consultations.length * 1000} BDT. </strong>
                Bonus Amount:{" "}
                <strong>
                  {Math.floor(consultations.length / 5) * 1000} BDT
                </strong>
                {/* (based on every 5 Success Cases) */}
              </span>
            </div>
          </div>
        )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm text-left text-gray-700 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Created Date",
                "Name",
                "Assigned",
                "Type",
                "Status",
                "Next Appointment",
                "Prefd Destination",
                "Address",
                "Phone",
                "IELTS",
                "Score",
                "Branch",
                "Action",
              ].map((header) => (
                <th key={header} className="p-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr
                key={consultation.id}
                className={`border-b ${
                  consultation.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 whitespace-nowrap">
                  {formatDate(consultation.createdAt) ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.fullName ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.assignedTo ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.type ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.status ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.appointmentDate ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.destination ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.address ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.phone ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.ielts ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.ieltsScore ?? ""}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {consultation.location ?? ""}
                </td>

                {consultation.type === "Success Case" && role === "employee" ? (
                  <td className="p-3 whitespace-nowrap flex gap-2 items-center">
                    {/* <LiaEditSolid
                    className="cursor-pointer"
                    title="Edit Lead"
                    onClick={() => {
                      setIsModalOpen1(true);
                      setLeadId(consultation.id);

                      // Reset form with existing values for editing
                      resetEdit({
                        status: consultation.status || '',
                        assignedTo: consultation.assignedTo || '',
                        appointmentDate: consultation.appointmentDate || '',
                      });
                    }}
                  /> */}
                    <Link
                      to={`/app/editLeads/${consultation.id}`}
                      title="View Details"
                    >
                      <MdOutlineGridView className="cursor-pointer" />
                    </Link>

                    <FaTrash
                      className="text-red-500 text-sm cursor-pointer"
                      title="Delete Lead"
                      onClick={() => handleDeleteUser(consultation.id)}
                    />
                  </td>
                ) : (
                  <td className="p-3 whitespace-nowrap flex gap-2 items-center">
                    <LiaEditSolid
                      className="cursor-pointer"
                      title="Edit Lead"
                      onClick={() => {
                        setIsModalOpen1(true);
                        setLeadId(consultation.id);

                        // Reset form with existing values for editing
                        resetEdit({
                          status: consultation.status || "",
                          assignedTo: consultation.assignedTo || "",
                          appointmentDate: consultation.appointmentDate || "",
                        });
                      }}
                    />
                    <Link
                      to={`/app/editLeads/${consultation.id}`}
                      title="View Details"
                    >
                      <MdOutlineGridView className="cursor-pointer" />
                    </Link>

                    <FaTrash
                      className="text-red-500 text-sm cursor-pointer"
                      title="Delete Lead"
                      onClick={() => handleDeleteUser(consultation.id)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {data?.meta && (
        <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
          <div>
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, data.meta.total)}
            </strong>{" "}
            of <strong>{data.meta.total}</strong>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </Button>
            <Button
              disabled={currentPage * itemsPerPage >= data.meta.total}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>Lead Management</ModalHeader>

        <ModalBody className="w-full max-w-screen-lg max-h-[70vh] overflow-y-auto">
          <div className="max-h-[80vh] overflow-y-auto px-4 py-2">
            <form
              onSubmit={handleSubmitAdd(onFormSubmit)}
              className="w-full mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("fullName", { required: true })}
                  />
                  {errorsAdd.fullName && (
                    <p className="text-red-500 text-sm">
                      Full name is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border rounded px-3 py-2"
                    placeholder="+8801XXXXXXXXX"
                    {...registerAdd("phone", { required: true })}
                  />
                  {errorsAdd.phone && (
                    <p className="text-red-500 text-sm">
                      Phone number is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("email", { required: true })}
                  />
                  {errorsAdd.email && (
                    <p className="text-red-500 text-sm">Email is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("date")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium mb-1"
                  >
                    Prefd Destination *
                  </label>
                  <select
                    id="destination"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("destination")}
                  >
                    <option value="">Select your destination</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>Belgium</option>
                    <option>Hungary</option>
                    <option>Denmark</option>
                    <option>Austria</option>
                    <option>Finland</option>
                    <option>Sweden</option>
                    <option>Cyprus</option>
                    <option>Malaysia</option>
                    <option>China</option>
                    <option>Dubai</option>
                  </select>
                  {errorsAdd.destination && (
                    <p className="text-red-500 text-sm">
                      Destination is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Address *
                  </label>
                  <input
                    id="address"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("address", { required: true })}
                  />
                  {errorsAdd.address && (
                    <p className="text-red-500 text-sm">Address is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium mb-1"
                  >
                    Lead Status{" "}
                  </label>
                  <select
                    id="status"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("status", { required: true })}
                  >
                    <option value="">Select Status</option>
                    <option className="Hot Lead">Hot Lead</option>
                    <option className="Cool Lead">Cool Lead</option>
                  </select>
                  {errorsAdd.status && (
                    <p className="text-red-500 text-sm">
                      Status selection is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ielts"
                    className="block text-sm font-medium mb-1"
                  >
                    IELTS *
                  </label>
                  <select
                    id="ielts"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("ielts", { required: true })}
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  {errorsAdd.ielts && (
                    <p className="text-red-500 text-sm">
                      IELTS selection is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ieltsScore"
                    className="block text-sm font-medium mb-1"
                  >
                    IELTS Score *
                  </label>
                  <input
                    type="text"
                    id="ieltsScore"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("ieltsScore", { required: true })}
                  />
                  {errorsAdd.ieltsScore && (
                    <p className="text-red-500 text-sm">Score is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium mb-1"
                  >
                    Appointment Location *
                  </label>
                  <select
                    id="location"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("location")}
                  >
                    <option value="">Select Location</option>
                    <option value="Edu Anchor">Edu Anchor</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Satkhira">Satkhira</option>
                    <option value="Jashore">Jashore</option>
                    <option value="Feni">Feni</option>
                    <option value="Nord Edu">Nord Edu</option>
                  </select>
                  {errorsAdd.location && (
                    <p className="text-red-500 text-sm">Location is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="applicationCode"
                    className="block text-sm font-medium mb-1"
                  >
                    Application Code{" "}
                  </label>
                  <input
                    id="applicationCode"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("applicationCode")}
                  />
                  {errorsAdd.applicationCode && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    SSC Year *
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("sscYear", { required: true })}
                  />
                  {errorsAdd.sscYear && (
                    <p className="text-red-500 text-sm">SSC Year required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    SSC Department *
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("sscDepartment", { required: true })}
                  />
                  {errorsAdd.sscDepartment && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    SSC GPA *
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("sscCGPA", { required: true })}
                  />
                  {errorsAdd.sscCGPA && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    HSC Year *
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("hscYear", { required: true })}
                  />
                  {errorsAdd.hscYear && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    HSC Department *
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("hscDepartment", { required: true })}
                  />
                  {errorsAdd.hscDepartment && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    HSC GPA *
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("hscCGPA", { required: true })}
                  />
                  {errorsAdd.hscCGPA && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bachelor Year
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("bachelorYear")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bachelor Department
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("bachelorDepartment")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bachelor GPA
                  </label>
                  <input
                    className="w-full border rounded px-3 py-2"
                    {...registerAdd("bachelorCGPA")}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>

      {/* Edit Lead Modal */}
      <Modal isOpen={isModalOpen1} onClose={() => setIsModalOpen1(false)}>
        <ModalHeader>Edit Lead</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitEdit(onFormEdit)} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Lead Type
              </label>
              <select
                {...registerEdit("type")}
                className="input input-bordered w-full shadow-md p-3"
              >
                <option value="">Select Type</option>
                <option value="Website Leads">
                  Meta Leads / Website Leads
                </option>
                <option value="Office Visits">Office Visits</option>
                <option value="Success Case">Previous Success Case</option>
              </select>
              {errorsEdit.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsEdit.type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Lead Status
              </label>
              <select
                {...registerEdit("status")}
                className="input input-bordered w-full shadow-md p-3"
              >
                <option value="">Select Status</option>
                <option value="Hot Lead">Hot Lead</option>
                <option value="Cool Lead">Cool Lead</option>
              </select>
              {errorsEdit.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errorsEdit.status.message}
                </p>
              )}
            </div>

            {(role === "superAdmin" ||
              role === "admin" ||
              role === "employee") && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Assigned To
                </label>
                <select
                  {...registerEdit("assignedTo")}
                  className="input input-bordered w-full shadow-md p-3"
                >
                  {(role === "superAdmin"
                    ? superAdmins
                    : role === "admin"
                    ? admins
                    : employees
                  ).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.FirstName} {user.LastName}
                    </option>
                  ))}
                </select>
                {errorsEdit.assignedTo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsEdit.assignedTo.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium mb-1"
              >
                Next Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                className="w-full border rounded px-3 py-2"
                {...registerEdit("appointmentDate")}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="submit" style={{ backgroundColor: "#C71320" }}>
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Leads;
