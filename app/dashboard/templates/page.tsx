
import Templates from '@/core/widgets/templates/Templates'
import React from 'react'
import { GetSession } from '@/core/utilities/GetSession';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

  const queryParameters = await searchParams;
  const session = await GetSession();

  return (
    <Templates session={session} query={queryParameters} path={"/dashboard/templates/"} />
  )
}








