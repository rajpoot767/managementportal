import { GetSession } from '@/core/utilities/GetSession';
import AllMatches from '@/core/widgets/matches/AllMatches'

import React from 'react'

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

    const queryParameters = await searchParams;

      const session  = await GetSession();
    

    return (
        <AllMatches session={session} query={queryParameters} path="/dashboard/matches/" />
    )
}

