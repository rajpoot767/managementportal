import { GetSession } from '@/core/utilities/GetSession';
import Commentary from '@/core/widgets/matches/Commentary';

import React from 'react'



export default async function Page({ params, searchParams }: {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>
}) {

  const resolvedParams = await params;
  const matchId = resolvedParams.matchId;
  
  const resolvedSearchParams = await searchParams;
  const session = await GetSession();



  return (
    <Commentary session={session} query={resolvedSearchParams} path={`/dashboard/matches/${matchId}/commentary/`} params={resolvedParams} />
  )

}