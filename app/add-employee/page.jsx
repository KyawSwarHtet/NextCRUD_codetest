"use client"

import Form from '@/components/Form'
import React from 'react'
import {useEmployeesStore} from "../../store/Employee"
const AddEmployee = () => {
  //  const employees = useEmployeesStore((state) => state.employeeList)
   const isLoading = useEmployeesStore((state) => state.isLoading);
  const createEmployee = useEmployeesStore((state) => state.createEmployee);
  const isError = useEmployeesStore((state) => state.error);
  
  return (
    <>
      <Form isError={isError} type="Add" createEmployee={createEmployee} />
    </>
  )
}

export default AddEmployee
