import Link from "next/link";

import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-4">
          <Link className="text-white font-bold text-2xl" href={'/'}>Employee Management</Link>
          <div className="md:gap-8 flex justify-between items-center gap-4 ">
          <Link className="md:p-2 bg-white  rounded-sm font-bold text-sm p-1" href={'/add-employee'}>Add Employee</Link>
          {/* <Link className="md:p-2 bg-white  rounded-sm font-bold text-sm p-1" href={'/edit-employee'}>Edit Employee</Link> */}
              <Link className="md:p-2 bg-white  rounded-sm font-bold text-sm p-1" href={'/'}>Employee List</Link>
              </div>
    </nav>
  )
}

export default Navbar
