import React, { useEffect, useState } from 'react'
import { Input } from '@windmill/react-ui'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import {
  useCreateProgramCountryMutation,
  useGetAllProgramCountryQuery,
} from '../features/programCountry/programCountry'

import {
  useCreateprogramUniversityMutation,
  useGetAllprogramUniversityQuery,
} from '../features/programUniversity/programUniversity'

import { useCreateprogramNameMutation } from '../features/programName/programName'
import { useCreateprogramIntakeMutation } from '../features/programIntake/programIntake'
import { useCreateprogramYearMutation } from '../features/programYears/programYears'
import axios from 'axios'

function Programs() {
  const [countries, setCountries] = useState([])
  const [universities, setUniversities] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState('');

  console.log("selectedCountryId", selectedCountryId)
  

  console.log("countries", countries)
  console.log("universities", universities)

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const form = e.target.form
      const index = Array.prototype.indexOf.call(form, e.target)
      form.elements[index + 1]?.focus()
    }
  }

  // === FETCH DATA ===
  const { data: countryData, isError: countryErr, error: errCountry } = useGetAllProgramCountryQuery()
   useEffect(() => {
    if (countryData?.data) setCountries(countryData.data)
    if (countryErr) console.log(errCountry?.data?.message)
  }, [countryData, countryErr, errCountry])


//   const { data: universityData, isError: universityErr, error: errUniversity } = useGetAllprogramUniversityQuery()

// useEffect(() => {
//     if (universityData?.data) setUniversities(universityData.data)
//     if (universityErr) console.log(errUniversity?.data?.message)
//   }, [universityData, universityErr, errUniversity])

useEffect(() => {
  const fetchUniversities = async () => {
    try {
      const res = await axios.get('https://api.eaconsultancy.info/api/v1/programUniversity/', {
        params: {
          country_id:selectedCountryId
        },
      })

      if (res.data?.success) {
        setUniversities(res.data.data)
      } else {
        console.error('Failed to fetch universities:', res.data?.message)
      }
    } catch (err) {
      console.error('Axios error:', err.response?.data?.message || err.message)
    }
  }

  fetchUniversities()
}, [selectedCountryId])




  // === MUTATIONS ===
  const [createProgramCountry] = useCreateProgramCountryMutation()
  const [createprogramUniversity] = useCreateprogramUniversityMutation()
  const [createprogramName] = useCreateprogramNameMutation()
  const [createprogramIntake] = useCreateprogramIntakeMutation()
  const [createprogramYear] = useCreateprogramYearMutation()

  // === FORM 1: Country ===
  const {
    register: regCountry,
    handleSubmit: submitCountry,
    reset: resetCountry,
    formState: { errors: errCountryForm },
  } = useForm()

  const onSubmitCountry = async (data) => {
    const res = await createProgramCountry(data)
    if (res.data?.success) {
      toast.success(res.data.message)
      resetCountry()
    } else toast.error(res.error?.data?.message || 'Failed to add country')
  }

  // === FORM 2: University ===
  const {
    register: regUniversity,
    handleSubmit: submitUniversity,
    reset: resetUniversity,
    formState: { errors: errUniversityForm },
  } = useForm()

  const onSubmitUniversity = async (info) => {
    const data = {
      university: info.university,
      country_id: info.country,
    }
    const res = await createprogramUniversity(data)
    if (res.data?.success) {
      toast.success(res.data.message)
      resetUniversity()
    } else toast.error(res.error?.data?.message || 'Failed to add university')
  }

  // === FORM 3: Program Name ===
  const {
    register: regProgram,
    handleSubmit: submitProgram,
    reset: resetProgram,
    formState: { errors: errProgramForm },
  } = useForm()

  const onSubmitProgram = async (info) => {

    const data = {
      program: info.program,
      country_id: info.country,
      university_id: info.university,

    }
    const res = await createprogramName(data)
    if (res.data?.success) {
      toast.success(res.data.message)
      resetProgram()
    } else toast.error(res.error?.data?.message || 'Failed to add program')
  }

  // === FORM 4: Intake ===
  const {
    register: regIntake,
    handleSubmit: submitIntake,
    reset: resetIntake,
    formState: { errors: errIntakeForm },
  } = useForm()

  const onSubmitIntake = async (data) => {
    const res = await createprogramIntake(data)
    if (res.data?.success) {
      toast.success(res.data.message)
      resetIntake()
    } else toast.error(res.error?.data?.message || 'Failed to add intake')
  }

  // === FORM 5: Year ===
  const {
    register: regYear,
    handleSubmit: submitYear,
    reset: resetYear,
    formState: { errors: errYearForm },
  } = useForm()

  const onSubmitYear = async (data) => {
    const res = await createprogramYear(data)
    if (res.data?.success) {
      toast.success(res.data.message)
      resetYear()
    } else toast.error(res.error?.data?.message || 'Failed to add year')
  }

  return (
    <div className="w-full px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-2xl font-semibold text-gray-900 mb-2">Programs</h4>
        <p className="text-sm text-gray-500 mb-8">Manage your Programs</p>

        {/* === FORM 1: Country === */}
        <form onSubmit={submitCountry(onSubmitCountry)} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700">Country</label>
            <Input {...regCountry('country', { required: 'Country is required' })} onKeyDown={handleEnter} />
            {errCountryForm.country && <p className="text-red-500 text-sm">{errCountryForm.country.message}</p>}
          </div>
          <button className="bg-brandRed text-white px-4 py-2 rounded">Add Country</button>
        </form>

        {/* === FORM 2: University === */}
        <form onSubmit={submitUniversity(onSubmitUniversity)} className="mb-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">University</label>
            <Input {...regUniversity('university', { required: 'University is required' })} onKeyDown={handleEnter} />
            {errUniversityForm.university && <p className="text-red-500 text-sm">{errUniversityForm.university.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700">Country</label>
            <select {...regUniversity('country', { required: 'Country is required' })} onKeyDown={handleEnter} className="w-full p-2 border rounded">
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.country}</option>
              ))}
            </select>
            {errUniversityForm.country && <p className="text-red-500 text-sm">{errUniversityForm.country.message}</p>}
          </div>
          <button className="bg-brandRed text-white px-4 py-2 rounded col-span-full">Add University</button>
        </form>

        {/* === FORM 3: Program Name === */}
        <form onSubmit={submitProgram(onSubmitProgram)} className="mb-6 grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Program</label>
            <Input {...regProgram('program', { required: 'Program name is required' })} onKeyDown={handleEnter} />
            {errProgramForm.program && <p className="text-red-500 text-sm">{errProgramForm.program.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700">Country</label>
            {/* <select {...regProgram('country', { required: 'Country is required' })} className="w-full p-2 border rounded" onKeyDown={handleEnter}>
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>{c.country}</option>
              ))}
            </select> */}
                    <select className="w-full p-2 border rounded mt-1" onKeyDown={handleEnter}
              name="country"
              {...regProgram('country', {
                onChange: (e) => {
                  const value = e.target.value;
                  setSelectedCountryId(value); // update your local state
                },
              })}
           
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.country}
                </option>
              ))}
            </select>
            {errProgramForm.country && <p className="text-red-500 text-sm">{errProgramForm.country.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700">University</label>
            <select {...regProgram('university', { required: 'University is required' })} className="w-full p-2 border rounded" onKeyDown={handleEnter}>
              <option value="">Select University</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.university}</option>
              ))}
            </select>
            {errProgramForm.university && <p className="text-red-500 text-sm">{errProgramForm.university.message}</p>}
          </div>
          
          <button className="bg-brandRed text-white px-4 py-2 rounded col-span-full">Add Program</button>
        </form>

        {/* === FORM 4: Intake === */}
        <form onSubmit={submitIntake(onSubmitIntake)} className="mb-6 flex gap-4 items-center">
          <Input {...regIntake('intake', { required: 'Intake is required' })} placeholder="Intake" className="w-full md:w-1/2" />
          <button className="bg-brandRed text-white px-4 py-2 rounded">Add Intake</button>
        </form>

        {/* === FORM 5: Year === */}
        <form onSubmit={submitYear(onSubmitYear)} className="mb-6 flex gap-4 items-center">
          <Input {...regYear('year', { required: 'Year is required' })} placeholder="Year" className="w-full md:w-1/2" />
          <button className="bg-brandRed text-white px-4 py-2 rounded">Add Year</button>
        </form>
      </div>
    </div>
  )
}

export default Programs
