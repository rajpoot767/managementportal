import { GetSession } from '@/core/utilities/GetSession';
import CloseMatches from '@/core/widgets/matches/CloseMatches';

import React from 'react'

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

    const queryParameters = await searchParams;

      const session  = await GetSession();
    

    return (
        <CloseMatches session={session} query={queryParameters} path="/dashboard/matches/closeMatches/" />
    )
}

