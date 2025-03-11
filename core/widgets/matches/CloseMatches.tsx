"use client"
import MatchService from '@/core/clients/MatchService';
import DataList from '@/core/components/DataList';
import Icon from '@/core/icons/Icon';
import OdataBuilder from '@/core/utilities/ODataBuilder';
import React, { useEffect, useState } from 'react'

const CloseMatches: React.FC<WidgetProps> = (props) => {

  const [dataset, setDataset] = useState<QueryResponse<any>>();

  const columns: DataListColumn[] = [
    {
      name: "matchId",
      label: "Match Id",
      controlType: "string",
      enableSorting: false,
    },
    {
      name: "matchName",
      label: "Match Name",
      controlType: "string",
      enableSorting: false,
    },
    {
      name: "matchType.matchTypeTitle",
      label: "Match Type",
      controlType: "string",
      enableSorting: false,
    },
    {
      name: "styxSportsMatchId",
      label: "Entity Sports Match ID",
      controlType: "string",
      enableSorting: false,
    },
  ];

  const fetchData = async () => {
    let query = props.query;
    const matchService = new MatchService(props.session);
    const queryString: string = OdataBuilder.getOdataQueryString(query, "createdDate desc");
    let response = await matchService.getAllClosedMatches(queryString);
    setDataset(response)
  }

  useEffect(() => {
    fetchData();
  }, [props])

  return (
    <>
      <div className='flex w-auto items-center justify-between py-2 px-4  bg-white'>
        <div className='flex items-center'>
          <Icon name="closeMatchIcon" className="size-6 mr-3 stroke-black fill-black" />
          <h2 className='text-2xl font-semibold text-body-950  py-2'>
            Close Matches</h2>
        </div>
        <div>
          
        </div>
      </div>
      <div className='max-h-96 m-4'>
        <DataList dataset={dataset} path={props.path} query={props.query} columns={columns} />
      </div>
    </>
  )
}

export default CloseMatches