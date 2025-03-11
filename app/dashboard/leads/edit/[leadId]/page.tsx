import { GetSession } from '@/core/utilities/GetSession';
import EditLead from '@/core/widgets/leads/EditLead';
import React from 'react'

export default async function Page({ params, searchParams }: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>
}) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const session = await GetSession();



  return (
    <EditLead session={session} query={resolvedSearchParams} path={"/dashboard/leads/edit/"} params={resolvedParams} />
  )

}