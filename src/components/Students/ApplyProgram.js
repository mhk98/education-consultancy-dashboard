import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Select } from '@windmill/react-ui';
import { useForm } from "react-hook-form";
import { useCreateApplicationMutation } from "../../features/application/application";
import toast from "react-hot-toast";


const ApplyProgram = ({id}) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const [createApplication] = useCreateApplicationMutation()
  const onFormSubmit = async(info) => {

    const data = {
      year:info.year,
      intake:info.intake,
      university:info.university,
      program:info.program,
      user_id:id
    }

    console.log("Applicationdata", data)
    try {
    const res = await createApplication(data)
      if(res.data.success === true) {
        toast.success(res.data.message)
      } else {
        toast.error(res?.error?.data?.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded shadow-sm w-full">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-blue-600">Quick Add Program</h2>
        <div className="flex items-center border border-blue-600 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search Program"
            className="px-4 py-2 text-sm focus:outline-none flex-1"
          />
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition">
            <FaSearch />
          </button>
        </div>

      </div>

      <div className="bg-white p-4 rounded border border-gray-200 mb-4 text-sm text-gray-600">
        We only show eligible programs for this student for the selected intake, year and university.
        To understand why certain programs are not eligible for this student, please go to Search Program.
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        {/* Year */}
        <div className="mt-4">
             {/* <label className="block text-sm mb-1 text-gray-700">Gender</label> */}
                        <Select
                          name="year"
                          {...register('year')}
                          className="mt-1">
                          <option>Select Year</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        </Select>
                {errors.year && <p style={{ color: "red", marginTop: "5px" }}>{errors.year.message}</p>}
                               
        </div>
        {/* Intake */}
        <div className="mt-4">
             {/* <label className="block text-sm mb-1 text-gray-700">Gender</label> */}
                        <Select
                          name="intake"
                          {...register('intake')}
                          className="mt-1">
                  
                        <option>Select Intake</option>
                        <option>Spring</option>
                        <option>Summer</option>
                        <option>Fall</option>
                        
                        </Select>
                {errors.intake && <p style={{ color: "red", marginTop: "5px" }}>{errors.intake.message}</p>}
                               
        </div>
        {/* University */}
  
        <div className="mt-4">
             {/* <label className="block text-sm mb-1 text-gray-700">Gender</label> */}
                        <Select
                          name="university"
                          {...register('university')}
                          className="mt-1">
                          <option>Select University</option>
                        <option>Budapest Metropolitan University of Applied Science</option>
                        <option>IBA Kolding, Denmark</option>
                        <option>International University of Applied Sciences</option>
                        <option>Thomas More - University of Applied Science</option>
                        </Select>
                {errors.university && <p style={{ color: "red", marginTop: "5px" }}>{errors.university.message}</p>}
                               
        </div>
        {/* Program */}
        <div className="mt-4">
             {/* <label className="block text-sm mb-1 text-gray-700">Gender</label> */}
                        <Select
                          name="program"
                          {...register('program')}
                          className="mt-1">
                          <option>Select Program</option>
                        <option>B.S. in Biology (B.S. to Masters in Chemical Biology Accelerated Program)</option>
                        <option>B.S. in Biology (B.S. to Pharmacy, Pharm.D. Accelerated Program)</option>
                        <option>B.A. in Computer Science (B.A. to Computer Science, M.S. Accelerated Program)</option>
                        <option>B.A. in Computer Science (B.A. to Software Engineering, M.S. Accelerated Program)</option>
                        <option>B.A. in Criminology and Criminal Justice (B.A. to M.A. Accelerated Program)</option>
                        </Select>
                {errors.program && <p style={{ color: "red", marginTop: "5px" }}>{errors.program.message}</p>}
                               
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="bg-blue-500 mt-4 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm"
        >
          <FaPlus /> Add
        </button>
      </form>
    </div>
  );
};

export default ApplyProgram;
