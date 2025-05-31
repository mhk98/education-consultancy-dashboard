import React, { useState, useEffect } from 'react'
import response from '../utils/demo/tableData'
import StudentTable from '../components/Students/StudentTable'
import StudentFilter from '../components/Students/StudentFilter'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui'
import { useUserRegisterMutation } from '../features/auth/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import toast from 'react-hot-toast'

import { useCreateProgramCountryMutation } from '../features/programCountry/programCountry'
import { useCreateprogramIntakeMutation } from '../features/programIntake/programIntake'
import { useCreateprogramUniversityMutation } from '../features/programUniversity/programUniversity'
import { useCreateprogramNameMutation } from '../features/programName/programName'
import { useCreateprogramYearMutation } from '../features/programYears/programYears'

function Programs() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  // }, [page])


   const [isModalOpen, setIsModalOpen] = useState(false)
  
   function closeModal() {
    setIsModalOpen(false)
  }



    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm()

    const [createprogramYear] = useCreateprogramYearMutation()

    const onFormSubmit = async (data) => {

        try {
            const res = await createprogramYear(data);
            if (res.data?.success) {
                toast.success(res.data.message);       
                reset()  
            } else {
                toast.error(res.error?.data?.message || "Failed please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };


    const [createProgramCountry] = useCreateProgramCountryMutation()

    const onFormSubmit1 = async (data) => {

        try {
            const res = await createProgramCountry(data);
            if (res.data?.success) {
                toast.success(res.data.message);         
            } else {
                toast.error(res.error?.data?.message || "Failed please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };


    const [createprogramIntake] = useCreateprogramIntakeMutation()

    const onFormSubmit2 = async (data) => {

        try {
            const res = await createprogramIntake(data);
            if (res.data?.success) {
                toast.success(res.data.message);         
            } else {
                toast.error(res.error?.data?.message || "Failed please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };

    const [createprogramUniversity] = useCreateprogramUniversityMutation()

    const onFormSubmit3 = async (data) => {

        try {
            const res = await createprogramUniversity(data);
            if (res.data?.success) {
                toast.success(res.data.message);         
            } else {
                toast.error(res.error?.data?.message || "Failed please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };


    const [createprogramName] = useCreateprogramNameMutation()

    const onFormSubmit4 = async (data) => {

        try {
            const res = await createprogramName(data);
            if (res.data?.success) {
                toast.success(res.data.message);         
            } else {
                toast.error(res.error?.data?.message || "Failed please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };


  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}
      <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:justify-between gap-4">
        {/* Left: Title and Subtitle */}
        <div>
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Programs</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your Programs</p>
        </div>

       <div className='mt-8'>
        
       <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col md:flex-row gap-4 items-start mb-6">  
          <input
            type="text"
            {...register("year")}
            name="year"
            placeholder="Year"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
           {errors.year && (
                    <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
                  )}
          <button
            type="submit"
            className="bg-brandRed text-white px-4 py-2 rounded hover:bg-brandRed-700"
          >
            Submit
          </button>
        </form>

       <form onSubmit={handleSubmit(onFormSubmit1)} className="flex flex-col md:flex-row gap-4 items-start mb-6">  
          <input
            type="text"
            {...register("country")}
            name="country"
            placeholder="Country"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
           {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                  )}
          <button
            type="submit"
            className="bg-brandRed text-white px-4 py-2 rounded hover:bg-brandRed-700"
          >
            Submit
          </button>
        </form>

       <form onSubmit={handleSubmit(onFormSubmit2)} className="flex flex-col md:flex-row gap-4 items-start mb-6">  
          <input
            type="text"
            {...register("intake")}
            name="intake"
            placeholder="Intake"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
           {errors.intake && (
                    <p className="text-red-500 text-sm mt-1">{errors.intake.message}</p>
                  )}
          <button
            type="submit"
            className="bg-brandRed text-white px-4 py-2 rounded hover:bg-brandRed-700"
          >
            Submit
          </button>
        </form>

       <form onSubmit={handleSubmit(onFormSubmit3)} className="flex flex-col md:flex-row gap-4 items-start mb-6">  
          <input
            type="text"
            {...register("university")}
            name="university"
            placeholder="University"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
           {errors.university && (
                    <p className="text-red-500 text-sm mt-1">{errors.university.message}</p>
                  )}
          <button
            type="submit"
            className="bg-brandRed text-white px-4 py-2 rounded hover:bg-brandRed-700"
          >
            Submit
          </button>
        </form>

       <form onSubmit={handleSubmit(onFormSubmit4)} className="flex flex-col md:flex-row gap-4 items-start mb-6">  
          <input
            type="text"
            {...register("program")}
            name="program"
            placeholder="Program"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
           {errors.program && (
                    <p className="text-red-500 text-sm mt-1">{errors.program.message}</p>
                  )}
          <button
            type="submit"
            className="bg-brandRed text-white px-4 py-2 rounded hover:bg-brandRed-700"
          >
            Submit
          </button>
        </form>

       </div>
      </div>
    </div>
      {/* <CTA /> */}
    </>
  )
}

export default Programs;
