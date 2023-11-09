"use client";

import { useEffect, useState } from "react";
import { useSearchParams,useParams } from "next/navigation";

import Form from "@/components/Form";
import {useEmployeesStore} from '../../../store/Employee'

const EditEmployee = ({ params }) => {
  // const params = useParams()
  const { id } = params;
  const searchParams = useSearchParams();

  // const [employees, setEmployees] = useState([]);

  const employees = useEmployeesStore((state) => state.employeeList)
   const isLoading = useEmployeesStore((state) => state.isLoading);
  const updateEmployee = useEmployeesStore((state) => state.updateEmployee)
  const isError = useEmployeesStore((state) => state.error);
  
  const findData = employees.find((data => data.id == id))
  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`);
  //     const data = await response.json();

  //     setEmployees(data);
  //   };

  //   if (id) fetchPosts();
  // }, [id]);

  return (
    <Form
      type="Edit"
      findData={findData}
      isLoading={isLoading}
      updateEmployee={updateEmployee}
      isError={isError}
    />
  );
};

export default EditEmployee;
