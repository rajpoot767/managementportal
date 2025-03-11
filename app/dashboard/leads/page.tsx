import { GetSession } from '@/core/utilities/GetSession';
import AllLeads from '@/core/widgets/leads/AllLeads';

import React from 'react'

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

    const queryParameters = await searchParams;

      const session  = await GetSession();
    

    return (
        <AllLeads session={session} query={queryParameters} path="/dashboard/leads/" />
    )
}

