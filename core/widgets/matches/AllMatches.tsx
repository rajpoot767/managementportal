"use client"
import MatchService from '@/core/clients/MatchService';
import DataList from '@/core/components/DataList';
import Icon from '@/core/icons/Icon';
import OdataBuilder from '@/core/utilities/ODataBuilder';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'


const AllMatches: React.FC<WidgetProps> = (props) => {
  const router = useRouter();

  const [dataset, setDataset] = useState<QueryResponse<any>>();

  const columns: DataListColumn[] = [
    {
      name: "matchId",
      label: "Id",
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
      label: "Styx Sports Match ID",
      controlType: "string",
      enableSorting: false,
    },
    {
      name: "providerMatchId",
      label: "Entity Sports Match ID",
      controlType: "string",
      enableSorting: false,
    },
    {
      name: "commentary",
      label: "commentary",
      controlType: "string",
      enableSorting: false,
      showAsLink:true,
      linkUrlSegment:"commentary",
      emptyValueLabel:"Commentary"
    },

  ];

  const fetchData = async () => {
    let query = props.query;
    const matchService = new MatchService(props.session);
    const queryString: string = OdataBuilder.getOdataQueryString(query,"createdDate desc");
    let response = await matchService.getAllActiveMatches(queryString);

    setDataset(response);
  }

  const handleNavigation = useCallback(() => {
    router.push('/dashboard/matches/add');
  }, []);

  useEffect(() => {
    fetchData();
  }, [props])

  return (
    <>
      <div className='flex w-auto items-center justify-between py-2 px-4  bg-white'>
        <div className='flex items-center'>
          <Icon name="matchIcon" className="size-6 mr-3 stroke-black" />
          <h2 className='text-2xl font-semibold text-body-950  py-2'>
            Matches</h2>
        </div>
        <div>
          <button
            className="relative bg-gradient-to-r from-primary-950 to-primary-800 text-white font-semibold flex items-center gap-2 py-3 px-6 rounded-full hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
            onClick={handleNavigation}
          >
            <Icon name="addIcon" className="size-5" />
            Add
          </button>
        </div>
      </div>
      <div className='max-h-96 m-4'>
        <DataList dataset={dataset} path={props.path} query={props.query} columns={columns} />
      </div>

    </>
  )
}

export default AllMatches