
import { GetSession } from '@/core/utilities/GetSession';
import AddTemplates from '@/core/widgets/templates/AddTemplates'
import React from 'react'

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

  const queryParameters = await searchParams;
  const session = await GetSession();

    return (
      <AddTemplates session={session} query={queryParameters} path={"/dashboard/templates/add/"}/>
    )
}

