
import { GetSession } from '@/core/utilities/GetSession';
import EditTemplate from '@/core/widgets/templates/EditTemplates'
import React from 'react'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ [key: string]: string }>; // Adjust based on your route parameters
  searchParams: Promise<{ [key: string]: string }>; // Query parameters may include arrays or undefined
}) {
  const resolvedParams = await params; // Resolve the params Promise
  const resolvedSearchParams = await searchParams; // Resolve the searchParams Promise
  const session  = await GetSession();

  return (
    <EditTemplate session={session} query={resolvedSearchParams} path={"/dashboard/templates/edit/"} params={resolvedParams} />
  )
}