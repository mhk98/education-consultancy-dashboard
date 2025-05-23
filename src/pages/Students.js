import React, { useState, useEffect } from 'react'
import response from '../utils/demo/tableData'
import StudentTable from '../components/Students/StudentTable'
import StudentFilter from '../components/Students/StudentFilter'
import { useForm } from 'react-hook-form'
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui'
import { useUserRegisterMutation } from '../features/auth/auth'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'
import toast from 'react-hot-toast'

function Students() {
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

  const First_Name = localStorage.getItem("FirstName")
  const Last_Name = localStorage.getItem("LastName")

    const onFormSubmit = async (data) => {
      const role = "student"
      console.log("formData", data)
		const formData = new FormData();
		formData.append("FirstName", data.FirstName);
		formData.append("LastName", data.LastName);
		formData.append("CreatedOn", `${First_Name} ${Last_Name}`);
		formData.append("Email", data.Email);
		formData.append("Password", data.Password);
		formData.append("Phone", data.Phone); 
		formData.append("Role", role); 
		if (image) {
			formData.append("image", image);
		}

    console.log("formData", formData)


		try {
			const res = await userRegister(formData);
			if (res.data?.success) {
				toast.success(res.data.message);
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
      <div >
        {/* Left: Title and Subtitle */}
        <div>
          <h4 className="text-2xl md:text-md font-semibold text-gray-900">Students</h4>
          <p className="text-sm md:text-sm text-gray-500 mt-1">Manage your Students and their Profiles</p>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Request Program Options */}
          <button className="px-4 py-2 bg-white text-brandRed border-2 border-brandRed rounded-md text-sm md:text-base transition">
            <Link to="/app/archive-student">Archived Students</Link>
          </button>

          {/* Register New Student */}
          <button  onClick={() => {
            setIsModalOpen(true)
          }} className="px-4 py-2 bg-brandRed text-white rounded-md text-sm md:text-base hover:bg-brandRed-700 transition">
            + Register New Student
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <ModalHeader>Register New Student</ModalHeader>
                        <ModalBody>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side */}
        
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">First Name</label>
                  <Input
                    type="text"
                    {...register("FirstName")}
                    className="input input-bordered w-full form-control shadow-md p-3"
                  />
                  {errors.FirstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.FirstName.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">Last Name</label>
                  <Input
                    type="text"
                    {...register("LastName")}
                    className="input input-bordered w-full form-control shadow-md p-3"
                  />
                  {errors.LastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.LastName.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">Mobile Number</label>
                  <Input
                    type="number"
                    {...register("Phone")}
                    className="input input-bordered w-full form-control shadow-md p-3"
                  />
                  {errors.Phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.Phone.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">Email</label>
                  <Input
                    type="email"
                    {...register("Email")}
                    className="input input-bordered w-full form-control shadow-md p-3"
                  />
                  {errors.Email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-700">Password</label>
                  <Input
                    type="password"
                    {...register("Password")}
                    className="input input-bordered w-full form-control shadow-md p-3"
                  />
                  {errors.Password && (
                    <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
                  )}
                </div>
            
                <div className="form-group">
												<label className="font-weight-700">Profile Image</label>
												<input type="file" accept="image/*" className="form-control" style={{paddingTop:"12px"}}  onChange={handleImageChange} />
                        {/* <input type="file" accept="application/pdf" onChange={handleImageChange} /> */}
                      </div>
         
            </div>
          
            <div className="flex justify-end gap-2 mt-6">
              <Button type="submit" className="btn btn-brandRed">
                Save
              </Button>
            </div>
          </form>
          
                        </ModalBody>
                      </Modal>
        </div>
      </div>
    </div>
      {/* <CTA /> */}

    {/* <StudentFilter/> */}
      <StudentTable/>
    </>
  )
}

export default Students
