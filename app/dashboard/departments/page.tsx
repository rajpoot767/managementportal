
import React from 'react'
// import { GetSession } from '@/core/utilities/GetSession';
import Departments from '@/core/widgets/departments/Departments';
import DepartmentService from '@/core/clients/DepartmentService';
import { DepartmentApiResponse } from '@/core/clients/DepartmentModel';

// export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
export default async function Page() {

  // const queryParameters = await searchParams;
  // const session = await GetSession();


    const templateService =  new DepartmentService();
    // const queryString: string = OdataBuilder.getOdataQueryString(query, "createdDate desc");
   const departmentResponse = await templateService.getAllDepartments()
  // console.log("as;lfdlk;slfdk;lsakfd;")
   console.log("ful department response", departmentResponse)


  return (
    // <Departments session={session} query={queryParameters} path={"/dashboard/departments/"} />
    <Departments departmentResponse={departmentResponse as DepartmentApiResponse} />
  )
}








