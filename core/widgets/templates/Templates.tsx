"use client"
import DataList from '@/core/components/DataList'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import TemplateService from '@/core/clients/TemplateService';
import OdataBuilder from '@/core/utilities/ODataBuilder'
import Icon from '@/core/icons/Icon'


const Templates: React.FC<WidgetProps> = (props) => {
    const [dataset, setDataset] = useState<QueryResponse<any>>();
    const router = useRouter();

    const fetchData = async () => {
        let query = props.query;
        const templateService = new TemplateService(props.session);
        const queryString: string = OdataBuilder.getOdataQueryString(query, "createdDate desc");
        let response = await templateService.getAllPredictionTemplates(queryString);
        setDataset(response);
    }

    const handleNavigation = useCallback(() => {
        router.push('/dashboard/templates/add');
    }, []);


    useEffect(() => {
        fetchData();
    }, [props])



    const columns: DataListColumn[] = [
        {
            name: "predictionTemplateId",
            label: "Id",
            controlType: "string",
            enableSorting: false
        },
        {
            name: "templateTitle",
            label: "Title",
            controlType: "string",
            enableSorting: false
        },
        {
            name: "matchType.matchTypeTitle",
            label: "Match Type",
            controlType: "string",
            enableSorting: false
        },
    ]

    return (
        <div className=' h-full  shadow-md  mb-2  '>
            <div className='flex w-auto items-center justify-between px-4 py-2 bg-white'>
                <div className='flex items-center'>
                    <Icon name="templateIcon" className="size-7 mr-3 stroke-black" />
                    <h3 className='text-2xl font-semibold text-body-950 '>
                        Prediction Templates</h3>
                </div>
                <div>
                    <button
                        className="relative bg-gradient-to-r from-primary-950 to-primary-800 text-white font-semibold flex items-center gap-2 py-3 px-6 rounded-full    hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                        onClick={handleNavigation}
                    >
                        <Icon name="addIcon" className="size-5" />
                        Add
                    </button>
                </div>
            </div>
            <div className='h-auto m-4'>
                <DataList dataset={dataset} columns={columns} path={props.path} query={props.query} />
            </div>
        </div>
    )
}

export default Templates