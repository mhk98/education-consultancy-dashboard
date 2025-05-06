import React, { useState, useEffect } from 'react'
import response from '../utils/demo/tableData'
import StudentTable from '../components/Students/StudentTable'
import StudentFilter from '../components/Students/StudentFilter'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui'
import { useUserRegisterMutation } from '../features/auth/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import toast from 'react-hot-toast'

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

    const [userRegister] = useUserRegisterMutation()
      const history = useHistory();

    const [image, setImage] = useState(null);


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    const onFormSubmit = async (data) => {
      console.log("formData", data)
        const formData = new FormData();
        formData.append("FirstName", data.FirstName);
        formData.append("LastName", data.LastName);
        formData.append("Email", data.Email);
        formData.append("Password", data.Password);
        formData.append("Phone", data.Phone); 
        formData.append("Role", data.Role); 
        if (image) {
            formData.append("image", image);
        }

    console.log("formData", formData)


        try {
            const res = await userRegister(formData);
            if (res.data?.success) {
                toast.success(res.data.message);
                history.push('/login');
            } else {
                toast.error(res.error?.data?.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };


  return (
    <>
      {/* <PageTitle>Dashboard</PageTitle> */}
      <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: Title and Subtitle */}
        <div>
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Programs</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your Programs</p>
        </div>

       <div className='mt-8'>
       <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col md:flex-row gap-4 items-start mb-6">
          <input
            type="text"
            name="title"
            placeholder="Document Title"
            required
            className="input border px-3 py-2 rounded w-full md:w-1/2"
          />
          <input
            type="file"
            name="file"
            accept="application/pdf"
            required
            className="input"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
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
