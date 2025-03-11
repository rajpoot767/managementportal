import { GetSession } from '@/core/utilities/GetSession';
import MatchesPrediction from '@/core/widgets/matches/MatchesPrediction'

import React from 'react'



export default async function Page({ params, searchParams }: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>
}) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const session = await GetSession();


  console.log("resolved",resolvedParams, "resolveSearch", resolvedSearchParams);

  return (
    <MatchesPrediction session={session} query={resolvedSearchParams} path={"/dashboard/matches/edit/"} params={resolvedParams} />
  )

}