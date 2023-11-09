"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {useEmployeesStore} from '../store/Employee'
import Table from './Table'


const EmployeeList = () => {

  const employees = useEmployeesStore((state) => state.employeeList)
   const isLoading = useEmployeesStore((state) => state.isLoading);
  const getAllEmployees = useEmployeesStore((state) => state.getAllEmployee)
  const deleteEmployee = useEmployeesStore((state) => state.deleteEmployee)
    const isError = useEmployeesStore((state) => state.error);
const router = useRouter()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is in the cache
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData == undefined|| null ) {      
          // If data is not found in cache, fetch from the API
          console.log("fetch all data from api")
          await getAllEmployees();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); //


    const handleEdit = (id) => {
    router.push(`/edit-employee/${id}`);
    };

     const handleDelete = async (id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await deleteEmployee(id);
        // router.refresh()
        
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <div>
      <h1 className="text-center my-4 ml-[1rem]  font-semibold text-2xl py-5 ">
         Employee List
      </h1>
      <div className='container mx-auto'>
        <Table isError={isError} isLoading={isLoading} employees = {employees && employees} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </div>
    </div>
  )
}

export default EmployeeList
