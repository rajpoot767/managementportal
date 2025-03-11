import { GetSession } from '@/core/utilities/GetSession';
import CloseMatchEdit from '@/core/widgets/matches/CloseMatchEdit';

import React from 'react'



export default async function Page({ params, searchParams }: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>
}) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const session = await GetSession();



  return (
    <CloseMatchEdit session={session} query={resolvedSearchParams} path={"/dashboard/matches/edit/"} params={resolvedParams} />
  )

}