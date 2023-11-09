"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CurrencyInput from "react-currency-input-field";
import Link from "next/link";

const Form = ({isError, type, createEmployee,findData ,updateEmployee,isLoading}) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({defaultValues:{id:findData?.id,employee_name:findData?.employee_name ,employee_salary:findData?.employee_salary,employee_age:findData?.employee_age,profile_image:findData?.profile_image }});

  watch("exclusiveData");

    const router = useRouter();


  const onSubmit = (data) => {
      createEmployee(data)   
      router.push("/");
    reset();
    };
    
     const onEdit = (data) => {
      updateEmployee(findData.id,data)
    //   router.refresh();    
      router.push("/");
    reset();
    };


  return (
    <>
      <form
        onSubmit={type === 'Add' ? handleSubmit(onSubmit) : handleSubmit(onEdit)}
        className="mx-[20rem] ss:mx-[10rem] my-7 shadow-lg"
      >
        <h1 className="mt-10 ml-[1rem] ss:text-[20px] font-semibold text-2xl py-5 text-center">
         {type} Employee Information
              </h1>
              
              {isError?.length > 0 ? <h2>{isError}</h2> : <></>}

        <div className="my-6 flex flex-col gap-10 mx-6 ">
          {/* Name*/}
          <div className="w-full">
            <h3 className="text-lg font-semibold">Name *</h3>
            <div className="flex flex-col gap-2 border-b-2 border-gray-600 py-4 w-full">
              <input   type="text"
                    placeholder="John Smith"
                   
                {...register("employee_name", {
                  required: "Employee name is required",
                  pattern: {
                    value: /^(?=.{1,33}$)[a-zA-Z0-9]*[^$%^&*;:,<>?()\"']*$/,
                    message: "Please enter a valid name",
                  },
                })}
                id="employee_name"
                name="employee_name"
                className="focus:border-none focus:outline-none "
              />
            </div>
            {errors.employee_name && (
              <span className="text-[14px] text-red-400">
                {`${errors.employee_name?.message}`}
              </span>
            )}
          </div>

          {/* Salary*/}
          <div className="w-full">
            <h3 className="text-lg font-semibold">Salary *</h3>
            <div className="flex justify-between items-center gap-2 border-b-2 border-gray-600 py-4 w-full">
             
              <CurrencyInput
                id="input-example"
                className="focus:border-none focus:outline-none"
                placeholder="4000.00"
                          allowDecimals = {false}
                              allowNegativeValue={false}
                         
                {...register("employee_salary", {
                  required: "Salary is required",
                  pattern: {
                    value: /^\d+(\.\d+)?/,
                    message: "Please enter a valid amount",
                  },
                })}
              />
            </div>
            {errors.employee_salary && (
              <span className="text-[14px] text-red-400">
                {`${errors.employee_salary?.message}`}
              </span>
            )}
          </div>

          {/* Age*/}
          <div className="w-full">
            <h3 className="text-lg font-semibold">Age *</h3>
            <div className="flex justify-between items-center gap-2 border-b-2 border-gray-600 py-4 w-full">         
              <input
                type="number"
                id="agreementdate"
                              placeholder="20"
                {...register("employee_age", {
                  required: "age is required",
                  pattern: {
                    value: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
                    message: "Please enter a valid date",
                  },
                })}
                name="employee_age"
                className="focus:border-none focus:outline-none"
              />
            </div>
            {errors.employee_age && (
              <span className="text-[14px] text-red-400">
                {`${errors.employee_age?.message}`}
              </span>
            )}

                  </div>
                  
                  {/* Profile*/}
          <div className="w-full">
            <h3 className="text-lg font-semibold">Profile Img *</h3>                          
                       <div className="flex flex-col gap-2 border-b-2 border-gray-600 py-4 w-full">
              <input
                type="text"
                              placeholder="image url"
                {...register("profile_image", {
                    required: "profile image is required",
                    
                  pattern: {
                    message: "Please enter a valid name",
                  },
                })}
                id="profile_image"
                name="profile_image"
                className="focus:border-none focus:outline-none "
              />
            </div>
            {errors.profile_image && (
              <span className="text-[14px] text-red-400">
                {`${errors.profile_image?.message}`}
              </span>
            )}

          </div>
       
        </div>
        <div className="flex justify-center gap-8 mt-12 pb-6">
          <button
            disabled={isSubmitting}
            data-testid="Add"
            type="submit"
            className="bg-[#990033] text-white font-semibold py-2 px-8 rounded-lg"
          > Add </button>
                  
                  <Link href={"/"}>
                      <button
            className="bg-[#210099] text-white font-semibold py-2 px-8 rounded-lg"
          >
            Cancel
                  </button>
                      </Link>
        </div>
      </form>
    </>
  );
};

export default Form;
