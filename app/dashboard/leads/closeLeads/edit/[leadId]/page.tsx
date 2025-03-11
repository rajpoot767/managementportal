import { GetSession } from '@/core/utilities/GetSession';
import CloseLeadEdit from '@/core/widgets/leads/CloseLeadEdit';

import React from 'react'

export default async function Page({ params, searchParams }: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>
}) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const session = await GetSession();



  return (
    <CloseLeadEdit session={session} query={resolvedSearchParams} path={"/dashboard/leads/closeLeads/edit/"} params={resolvedParams} />
  )

}