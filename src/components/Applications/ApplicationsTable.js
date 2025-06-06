
import React, { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Input, Label, Button, Modal, ModalHeader, ModalBody } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiShow, BiSolidTrashAlt } from "react-icons/bi";
import {
  useDeleteApplicationMutation,
  useGetAllApplicationQuery,
  useUpdateApplicationMutation,
} from "../../features/application/application";

export default function ApplicationsTable() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Country, setCountry] = useState("");
  const [University, setUniversity] = useState("");
  const [Intake, setIntake] = useState("");
  const [StudentId, setStudentId] = useState("");
  const [stdId, setStdId] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const role = localStorage.getItem("role");
  const branch = localStorage.getItem("branch");
  const userId = localStorage.getItem("userId");

  // ✅ Add query args for student
  const queryArgs =
    role === "superAdmin"
      ? { FirstName, LastName, user_id: StudentId }
      : role === "admin"
      ? { branch, FirstName, LastName, user_id: StudentId }
      : role === "student"
      ? { user_id: userId }
      : null;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllApplicationQuery(queryArgs, { skip: !queryArgs });

  const [updateApplication] = useUpdateApplicationMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onFormEdit = async (formData) => {
    const payload = {
      assignee: formData.assignee,
      status: formData.status,
      user_id: stdId,
    };

    try {
      const res = await updateApplication({ id: applicationId, data: payload });
      if (res.data?.success) {
        toast.success(res.data.message);
        reset()
        setIsModalOpen(false)
      } else {
        toast.error(res.error?.data?.message || "Update failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  // ✅ Always use data?.data for applications
  const students = useMemo(() => {
    return data?.data || [];
  }, [data]);

  // ✅ Trimmed and cleaned filtering logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const first = FirstName.trim().toLowerCase();
      const last = LastName.trim().toLowerCase();
      const country = Country.trim().toLowerCase();
      const university = University.trim().toLowerCase();
      const intake = Intake.trim().toLowerCase();
      const user_id = StudentId.trim().toLowerCase();

      return (
        (!first || student.FirstName?.toLowerCase().includes(first)) &&
        (!last || student.LastName?.toLowerCase().includes(last)) &&
        (!country || student.country?.toLowerCase().includes(country)) &&
        (!university || student.university?.toLowerCase().includes(university)) &&
        (!intake || student.intake?.toLowerCase().includes(intake)) &&
        (!user_id || student.user_id?.toLowerCase().includes(user_id))
      );
    });
  }, [students, FirstName, LastName, Country, University, Intake, StudentId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? ""
      : date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
  };

  const [deleteApplication, refetch] = useDeleteApplicationMutation()

  const handleDeleteApplication = async (acknowledge) => {
      try {
        const res = await deleteApplication(acknowledge);
        if (res.data?.success) {
          toast.success(res.data.message);
          refetch();
        } else {
          toast.error(res.error?.data?.message || 'Deletion failed.');
        }
      } catch {
        toast.error('An unexpected error occurred.');
      }
    };

  const renderTableRows = (dataToRender) => {
    return dataToRender.map((program, idx) => (
      <tr
        key={idx}
        className={`text-sm border-t border-gray-200 ${
          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <td className="p-3 whitespace-nowrap">{program.user_id}</td>
        <td className="p-3 whitespace-nowrap">{program.acknowledge}</td>
        <td className="p-3 whitespace-nowrap">{formatDate(program.createdAt)}</td>
        <td className="p-3 whitespace-nowrap">{program.FirstName} {program.LastName}</td>
        <td className="p-3 whitespace-nowrap">{program.university}</td>
        <td className="p-3 whitespace-nowrap">{program.program}</td>
        <td className="p-3 whitespace-nowrap">{program.intake}</td>
        <td className="p-3 whitespace-nowrap">{program.FirstName} {program.LastName}</td>
        <td className="p-3 whitespace-nowrap">{program.status}</td>
        <td className="p-3 whitespace-nowrap">{program.assignee}</td>
        <td className="p-3 whitespace-nowrap flex gap-3 text-brandRed">
          <Link to={`/app/editprofile/${program.user_id}`}>
            <BiShow fontSize={20} className="cursor-pointer" />
          </Link>
          <LiaEditSolid
            fontSize={20}
            className="cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
              setStdId(program.user_id);
              setApplicationId(program.id);
            }}
          />
          {
            role === "superAdmin" &&
            <BiSolidTrashAlt
                              onClick={() => handleDeleteApplication(program.acknowledge)}
                              className="cursor-pointer"
                            />
          }
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto p-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Label>
          <span>First Name</span>
          <Input value={FirstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1" placeholder="First Name" />
        </Label>
        <Label>
          <span>Last Name</span>
          <Input value={LastName} onChange={(e) => setLastName(e.target.value)} className="mt-1" placeholder="Last Name" />
        </Label>
        <Label>
          <span>Country</span>
          <Input value={Country} onChange={(e) => setCountry(e.target.value)} className="mt-1" placeholder="Country" />
        </Label>
        <Label>
          <span>University</span>
          <Input value={University} onChange={(e) => setUniversity(e.target.value)} className="mt-1" placeholder="University" />
        </Label>
        <Label>
          <span>Intake</span>
          <Input value={Intake} onChange={(e) => setIntake(e.target.value)} className="mt-1" placeholder="Intake" />
        </Label>
        <Label>
          <span>Student Id</span>
          <Input value={StudentId} onChange={(e) => setStudentId(e.target.value)} className="mt-1" placeholder="Student Id" />
        </Label>
        <div className="flex items-end gap-2">
          <Button
            className="w-full bg-brandRed text-white"
            onClick={() => {
              setFirstName("");
              setLastName("");
              setCountry("");
              setUniversity("");
              setIntake("");
              setStudentId("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr className="text-left">
            <th className="p-3">Student ID</th>
            <th className="p-3">Ack No</th>
            <th className="p-3">Date Created</th>
            <th className="p-3">Student</th>
            <th className="p-3">University</th>
            <th className="p-3">Program</th>
            <th className="p-3">Intake</th>
            <th className="p-3">Created</th>
            <th className="p-3">Status</th>
            <th className="p-3">Assignee</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            renderTableRows(filteredStudents)
          ) : (
            <tr>
              <td colSpan="11" className="p-4 text-center text-gray-500">
                No student profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="mb-8">Edit Application</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onFormEdit)}>
            <div className="grid grid-cols-1 gap-4">
              {role === "superAdmin" && (
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">Stages of an Application</label>
                  <select {...register("status")} className="input input-bordered w-full shadow-md p-3">
                    <option value="">Select Status</option>
                    <option value="Application Submitted">Application Submitted</option>
                    <option value="University Application Initiated">University Application Initiated</option>
                    <option value="Offer Recieved">Offer Recieved</option>
                    <option value="Tuition Fees Paid">Tuition Fees Paid</option>
                    <option value="LOA Received">LOA Received</option>
                    <option value="Visa Submitted">Visa Submitted</option>
                    <option value="Visa Received">Visa Received</option>
                    <option value="Case Closed">Case Closed</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-700">EduAnchor Assignee</label>
                <select {...register("assignee")} className="input input-bordered w-full shadow-md p-3">
                  <option value="">Select Assignee</option>
                  <option value="Rakib">Rakib</option>
                  <option value="Shakib">Shakib</option>
                  <option value="Habib">Habib</option>
                </select>
                {errors.assignee && <p className="text-red-500 text-sm mt-1">{errors.assignee.message}</p>}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button type="submit" className="btn" style={{ backgroundColor: "#C71320" }}>
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
