import React, { useState } from 'react';
import EnquiriesRequestedFilter from '../components/Enquiries/EnquiriesRequestedFilter';
import EnquiriesArchivedFilter from '../components/Enquiries/EnquiriesArchivedFilter';
import EnquiriesRequestedPanel from '../components/Enquiries/EnquiriesRequestedPanel';
import { Modal, ModalHeader, ModalBody, Input, Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select'; // Correct select import
import { Label } from '@windmill/react-ui';
import { useCreateEnquiriesMutation } from '../features/enquiries/enquiries';
import EnquiriesArchivedPanel from '../components/Enquiries/EnquiriesArchivedPanel';


const studyAreaOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'business', label: 'Business' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'arts', label: 'Arts' },
  { value: 'law', label: 'Law' },
];

const studyLevelOptions = [
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'phd', label: 'PhD' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'certificate', label: 'Certificate' },
];

function Enquiries() {
  const [enquiryType, setEnquiryType] = useState('not-in');
  const [activeTab, setActiveTab] = useState('requested');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isRequested = activeTab === 'requested';

  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [createEnquiries] = useCreateEnquiriesMutation();

  const closeModal = () => setIsModalOpen(false);


 const [files, setFiles] = useState([]);

const handleFileChange = (e) => {
  setFiles(Array.from(e.target.files)); // convert FileList to Array
};

  // const onFormSubmit = async (data) => {

  //   const formData = new FormData();
	// 	formData.append("studyArea", data.studyArea?.map((option) => option.value));
	// 	formData.append("studyLevel", data.studyLevel?.map((option) => option.value));
	// 	formData.append("firstName", data.firstName);
	// 	formData.append("lastName", data.lastName);
	// 	formData.append("destination", data.destination);
	// 	formData.append("educationCountry", data.educationCountry);
	// 	formData.append("educationLevel", data.educationLevel);

	// 	if (file) {
	// 		formData.append("file", file);
	// 	}

  //   console.log("formdata", formData)
  //   try {
  //     const res = await createEnquiries(formData);
  //     if (res.data?.success) {
  //       toast.success(res.data.message);
  //       reset();
  //       closeModal();
  //     } else {
  //       toast.error(res.error?.data?.message || 'Failed. Please try again.');
  //     }
  //   } catch (error) {
  //     toast.error('An unexpected error occurred.');
  //   }
  // };

const id = localStorage.getItem("userId")
  const onFormSubmit = async (data) => {
    const formData = new FormData();
  
    // data.studyArea?.forEach((option) => {
    //   formData.append("studyArea[]", option.value);
    // });
  
    // data.studyLevel?.forEach((option) => {
    //   formData.append("studyLevel[]", option.value);
    // });

    formData.append("studyArea", data.studyArea?.map((option) => option.value));
    formData.append("studyLevel", data.studyLevel?.map((option) => option.value));
  
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("destination", data.destination);
    formData.append("educationCountry", data.educationCountry);
    formData.append("educationLevel", data.educationLevel);
    formData.append("additionalInfo", data.additionalInfo);
    formData.append("branch", data.branch);
    formData.append("user_id", id);
    files.forEach((file) => {
      formData.append("files", file); // "files" matches multer's field name
    });
  
    try {
      const res = await createEnquiries(formData);
      if (res.data?.success) {
        toast.success(res.data.message);
        reset();
        closeModal();
      } else {
        toast.error(res.error?.data?.message || 'Failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
  };
  
  return (
    <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">Enquiries</h4>
          <p onClick={() => setIsModalOpen(true)} className="text-sm text-gray-500 mt-1 cursor-pointer">
            Manage your student’s enquiries.
          </p>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>Request For Course Options</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">
                    Select Enquiry Type<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="enquiryType"
                        value="not-in"
                        checked={enquiryType === 'not-in'}
                        onChange={() => setEnquiryType('not-in')}
                        className="accent-blue-600"
                      />
                      Student not in EduAnchor.ai
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="enquiryType"
                        value="in"
                        checked={enquiryType === 'in'}
                        onChange={() => setEnquiryType('in')}
                        className="accent-blue-600"
                      />
                      Student in EduAnchor.ai
                    </label>
                  </div>
                </div>

                {enquiryType === 'in' ? (
                  <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 font-medium">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <Input {...register('firstName', { required: true })} placeholder="Enter First Name" />
                      {errors.firstName && <p className="text-red-500 text-sm">First name is required.</p>}
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">
                        Last Name<span className="text-red-500">*</span>
                      </label>
                      <Input {...register('lastName', { required: true })} placeholder="Enter Last Name" />
                      {errors.lastName && <p className="text-red-500 text-sm">Last name is required.</p>}
                    </div>

                    <div>
          <label className="block mb-1 font-medium">Select Branch<span className="text-red-500">*</span></label>
                      <select {...register('branch', { required: true })} className="w-full border rounded px-3 py-2">
                        <option >Select Branch</option>
                        <option value="">Select Branch</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Khulna">Khulna</option>
                      </select>
                      {errors.branch && (
                      <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
                    )}
                  </div>
                  
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 font-medium">Preferred Destination<span className="text-red-500">*</span></label>
                      <select {...register('destination', { required: true })} className="w-full border rounded px-3 py-2">
                        <option value="">Select Destination</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Finland">Finland</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Student's Country of Education<span className="text-red-500">*</span></label>
                      <select {...register('educationCountry', { required: true })} className="w-full border rounded px-3 py-2">
                        <option value="">Select Country</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Finland">Finland</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Highest Education Level<span className="text-red-500">*</span></label>
                      <select {...register('educationLevel', { required: true })} className="w-full border rounded px-3 py-2">
                        <option >Select Level</option>
                        <option value="SSC">SSC</option>
                        <option value="HSC">HSC</option>
                        <option value="Bachelor">Bachelor</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>
                        Preferred Study Area <span className="text-red-500">*</span>
                        <span className="text-sm text-gray-500"> (Max 3)</span>
                      </Label>
                      <Controller
                        name="studyArea"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={studyAreaOptions}
                            onChange={(selected) => {
                              field.onChange(selected);
                              clearErrors('studyArea');
                            }}
                            className="text-sm"
                            placeholder="Select Study Areas"
                          />
                        )}
                      />
                      {errors.studyArea && <p className="text-red-500 text-sm">Study area is required.</p>}
                    </div>

                    <div>
                      <Label>
                        Preferred Level <span className="text-red-500">*</span>
                        <span className="text-sm text-gray-500"> (Max 3)</span>
                      </Label>
                      <Controller
                        name="studyLevel"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={studyLevelOptions}
                            onChange={(selected) => {
                              field.onChange(selected);
                              clearErrors('studyLevel');
                            }}
                            className="text-sm"
                            placeholder="Select Study Levels"
                          />
                        )}
                      />
                      {errors.studyLevel && <p className="text-red-500 text-sm">Study level is required.</p>}
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Additional Information</label>
                    <textarea
                      {...register("additionalInfo")}
                      placeholder="Type your message here..."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4} // Optional: Adjust height
                    />
                    {errors.additionalInfo && (
                      <p className="text-red-500 text-sm">{errors.additionalInfo.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Academic Documents</label>
                    <input
                      type="file"
                      name="files" // use plural
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="w-full"
                      multiple // allow multiple file selection
                    />
                  </div>

                  <div className="text-center">
                    <Button type="submit">Request Course Options</Button>
                  </div>
                </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div>
                        <label className="block mb-1 font-medium">
                          First Name<span className="text-red-500">*</span>
                        </label>
                        <Input {...register('firstName', { required: true })} placeholder="Enter First Name" />
                        {errors.firstName && <p className="text-red-500 text-sm">First name is required.</p>}
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">
                          Last Name<span className="text-red-500">*</span>
                        </label>
                        <Input {...register('lastName', { required: true })} placeholder="Enter Last Name" />
                        {errors.lastName && <p className="text-red-500 text-sm">Last name is required.</p>}
                      </div>
                      <div>
          <label className="block mb-1 font-medium">Select Branch<span className="text-red-500">*</span></label>
                      <select {...register('branch', { required: true })} className="w-full border rounded px-3 py-2">
                        <option >Select Branch</option>
                        <option value="">Select Branch</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Khulna">Khulna</option>
                      </select>
                      {errors.branch && (
                      <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
                    )}
                  </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 font-medium">Preferred Destination<span className="text-red-500">*</span></label>
                      <select {...register('destination', { required: true })} className="w-full border rounded px-3 py-2">
                        <option value="">Select Destination</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Finland">Finland</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Student's Country of Education<span className="text-red-500">*</span></label>
                      <select {...register('educationCountry', { required: true })} className="w-full border rounded px-3 py-2">
                        <option value="">Select Country</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Finland">Finland</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Highest Education Level<span className="text-red-500">*</span></label>
                      <select {...register('educationLevel', { required: true })} className="w-full border rounded px-3 py-2">
                        <option >Select Level</option>
                        <option value="SSC">SSC</option>
                        <option value="HSC">HSC</option>
                        <option value="Bachelor">Bachelor</option>
                      </select>
                    </div>
                  </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>
                          Preferred Study Area <span className="text-red-500">*</span>
                          <span className="text-sm text-gray-500"> (Max 3)</span>
                        </Label>
                        <Controller
                          name="studyArea"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isMulti
                              options={studyAreaOptions}
                              onChange={(selected) => {
                                field.onChange(selected);
                                clearErrors('studyArea');
                              }}
                              className="text-sm"
                              placeholder="Select Study Areas"
                            />
                          )}
                        />
                        {errors.studyArea && <p className="text-red-500 text-sm">Study area is required.</p>}
                      </div>

                      <div>
                        <Label>
                          Preferred Level <span className="text-red-500">*</span>
                          <span className="text-sm text-gray-500"> (Max 3)</span>
                        </Label>
                        <Controller
                          name="studyLevel"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isMulti
                              options={studyLevelOptions}
                              onChange={(selected) => {
                                field.onChange(selected);
                                clearErrors('studyLevel');
                              }}
                              className="text-sm"
                              placeholder="Select Study Levels"
                            />
                          )}
                        />
                        {errors.studyLevel && <p className="text-red-500 text-sm">Study level is required.</p>}
                      </div>
                    </div>

                    <div className="w-full">
                    <label className="block mb-1 font-medium">Additional Information</label>
                    <textarea
                      {...register("additionalInfo")}
                      placeholder="Type your message here..."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4} // Optional: Adjust height
                    />
                    {errors.additionalInfo && (
                      <p className="text-red-500 text-sm">{errors.additionalInfo.message}</p>
                    )}
                  </div>

                    <div>
                    <label className="block mb-1 font-medium">Academic Documents</label>
                    <input
                      type="file"
                      name="files" // use plural
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="w-full"
                      multiple // allow multiple file selection
                    />
                  </div>

                    <div className="text-center">
                      <Button style={{backgroundColor:"#C71320"}} type="submit">Request Course Options</Button>
                    </div>
                  </div>
                )}
              </form>
            </ModalBody>
          </Modal>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-brandRed text-white rounded-md"
          >
            + Request Program Options from EduAnchor Team
          </button>
        </div>
      </div>

      <div className="w-full sm:w-auto mt-4">
        <div className="flex gap-4 text-sm font-medium mb-1">
          <span
            onClick={() => setActiveTab('requested')}
            className={`cursor-pointer pb-1 ${isRequested ? 'text-brandRed' : 'text-gray-800'}`}
          >
            Requested
          </span>
          <span
            onClick={() => setActiveTab('paid')}
            className={`cursor-pointer pb-1 ${!isRequested ? 'text-brandRed' : 'text-gray-800'}`}
          >
            Archived
          </span>
        </div>
        <div className="h-1 bg-blue-100 rounded-full">
          <div
            className="h-1 bg-brandRed rounded-full transition-all duration-300"
            style={{ width: isRequested ? '10%' : '20%' }}
          ></div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-md shadow-md">
        {isRequested ? <EnquiriesRequestedPanel/> : <EnquiriesArchivedPanel/>}
      </div>
    </div>
  );
}

export default Enquiries;
