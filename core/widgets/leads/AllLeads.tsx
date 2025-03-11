"use client"

import LeadService from '@/core/clients/LeadService';
import DataList from '@/core/components/DataList';
import Icon from '@/core/icons/Icon';
import OdataBuilder from '@/core/utilities/ODataBuilder';
import React, { useEffect, useState } from 'react';

const leadsColumns: DataListColumn[] = [
    {
        name: "leadId",
        label: "lead Id",
        controlType: "string",
        enableSorting: false,
    },
    {
        name: "name",
        label: "Name",
        controlType: "string",
        enableSorting: false,
    },
    {
        name: "email",
        label: "Email",
        controlType: "string",
        enableSorting: false,
    },
    {
        name: "phone",
        label: "Phone No",
        controlType: "string",
        enableSorting: false,
    },
    {
        name: "createdDate",
        label: "Created Date",
        controlType: "string",
        enableSorting: false,
    },

    {
        name: "message",
        label: "message",
        controlType: "string",
        enableSorting: false,
    },


];


const AllLeads: React.FC<WidgetProps> = (props) => {
    const [dataset, setDataset] = useState<QueryResponse<any>>();

    const fetchData = async () => {
        let query = props.query ?? {};

        if (query) {
            query["$filter"] = "isClosed eq false";
        }
        const leadService = new LeadService(props.session);
        const queryString: string = OdataBuilder.getOdataQueryString(query, "createdDate desc");
        let response = await leadService.getAllLeads(queryString);
        setDataset(response);
    }

    useEffect(() => {
        fetchData();
    }, [props])

    return (
        <div className='h-full py-2 px-4  overflow-y-scroll '>
            <div className='flex w-auto items-center justify-between pb-4  bg-white'>
                <div className='flex items-center'>
                    <Icon name="leadIcon" className="size-6 mr-3 stroke-black " />
                    <h3 className='text-2xl font-semibold text-body-950 py-2'>
                        Active Leads</h3>
                </div>
            </div>
            <div className='mb-4 '>
                <DataList dataset={dataset} path={props.path} query={props.query} columns={leadsColumns} />
            </div>
        </div>
    )
}

export default AllLeads;