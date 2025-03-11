import { GetSession } from '@/core/utilities/GetSession';
import CloseLeads from '@/core/widgets/leads/CloseLeads';

import React from 'react'

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

    const queryParameters = await searchParams;

      const session  = await GetSession();
    

    return (
        <CloseLeads session={session} query={queryParameters} path="/dashboard/leads/closeLeads/" />
    )
}

