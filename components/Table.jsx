
import Image from "next/image";
import { useState } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import ReactPaginate from 'react-paginate'
import './pagination.css'

export default function Table({ isError, isLoading, employees, handleEdit, handleDelete }) {

    const [pageNumber,setPageNumber] =useState(0)
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage

    const displayUsers = employees.slice(pagesVisited, pagesVisited + usersPerPage);
    
    const pageCount = Math.ceil(employees.length / usersPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

 
    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
      <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain block"
      />
    </div>
        )
    }

    return (
        <>
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-5 py-2">
                        <span className="text-gray-200">Emp:ID</span>
                    </th>
                    <th className="px-14 py-2">
                        <span className="text-gray-200">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Salary</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Age</span>
                    </th>
                     <th className="px-16 py-2">
                        <span className="text-gray-200">Actions</span>
                    </th>
            </tr>
                </thead>
                <>
            <tbody className="bg-gray-200">

                {
                        isLoading ? (
                            <>
                        <tr className="w-full flex-center">
                            <Image
                                src="assets/icons/loader.svg"
                                width={50}
                                height={50}
                                alt="loader"
                                className="object-contain"
                            />
                                </tr>
                                </>
                            ) : (employees &&(displayUsers.map((data, key) => 
                        (<>
                        <tr className="bg-gray-50 text-center border-b-2 border-gray-200" key={key}>
                            <td className="px-5 py-2">
                                <span className="text-center ml-2 font-semibold">{data.id}</span>
                            </td>
                        
                            <td className="px-14 py-2 flex gap-2 flex-row items-center">
                                <img className="rounded w-[28px] h-[28px]" src={data.profile_image == "" ? '/assets/icons/defaultuserprofile.png' : data.profile_image} alt="" />
                                {/* <span className="text-center ml-2 font-semibold">{employee.name.length > 25 ? `${employee.name.substring(0, 25)}...` : employee.name}</span> */}
                                <span className="text-center ml-2 font-semibold">{data?.employee_name.length > 25 ? `${data.employee_name.substring(0, 25)}...` : data.employee_name}</span>
                            </td>
                            <td className="px-16 py-2">
                                <span>{data.employee_salary}</span>
                            </td>
                            <td className="px-16 py-2">
                                <span>{data.employee_age}</span>
                            </td>
                            <td className="px-16 py-2 flex justify-around gap-3">
                                <button onClick={()=> handleEdit && handleEdit(data.id)} className="cursor"><BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit></button>
                                <button onClick={()=> handleDelete && handleDelete(data.id)} className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt></button>
                            </td>
                        </tr></>)
                    )) 
                    )}
                    </tbody>
                    </>
            </table>
            
            <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationBttns"}
                previousClassName={"previousBttn"} nextLinkClassName={"nextBttn"} disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"} />
            </>
    )
}